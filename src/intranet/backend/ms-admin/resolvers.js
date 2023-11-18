const admin = require("firebase-admin");
const firebaseConfig = require("../../../../firebase.json");

// Configura Firebase
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://usuarios-80f40-default-rtdb.firebaseio.com/",
});

const resolvers = {
    Query: {
        // ... Resolver para persons y logEntries
        persons: async () => {
            const db = admin.database();
            const ref = db.ref("persons"); // Ajusta el nombre de la referencia según tu estructura de datos
            const snapshot = await ref.once("value");
            const data = snapshot.val();
            return Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
        },

        logEntries: async () => {
            const db = admin.database();
            const logRef = db.ref("logs"); // Ajusta la referencia según tu estructura de datos para los registros de log
            const snapshot = await logRef.once("value");
            const data = snapshot.val();
            const logEntries = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            return logEntries;
        },

        administrators: async () => {   // <--
            const db = admin.database();
            const ref = db.ref("administrators"); // Ajusta el nombre de la referencia según tu estructura de datos
            const snapshot = await ref.once("value");
            const data = snapshot.val();
            return Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
        },
    },
    Mutation: {
        // ... Resolver para addPerson y addLogEntry
        addPerson: async (_, { input }) => {
            const db = admin.database();
            const ref = db.ref("persons"); // Ajusta la referencia según tu estructura de datos

            // Genera un nuevo ID para el registro
            const newRef = ref.push();

            // Inserta los datos del input en la base de datos
            await newRef.set(input);

            // Devuelve el registro recién insertado
            return {
                id: newRef.key,
                ...input,
            };
        },

        addLogEntry: async (_, { input }) => {
            const db = admin.database();
            const logRef = db.ref("logs"); // Ajusta la referencia según tu estructura de datos para los registros de log

            // Genera un nuevo ID para el registro de log
            const newLogRef = logRef.push();

            // Inserta los datos del input en la base de datos
            await newLogRef.set(input);

            // Devuelve el registro de log recién insertado
            return {
                id: newLogRef.key,
                ...input,
            };
        },

        addAdministrator: async (_, { input }) => {
            const db = admin.database();
            const adminRef = db.ref("administrators"); // Ajustar según la referencia para administradores

            // Generar un nuevo ID para el administrador
            const newAdminRef = adminRef.push();

            // Insertar los datos del input en la base de datos
            await newAdminRef.set(input);

            // Devolver el administrador recién insertado
            return {
                id: newAdminRef.key,
                ...input,
            };
        },

        // ... Código existente para addPerson, addLogEntry y addAdministrator

        updateAdministrator: async (_, { input }) => {
            const db = admin.database();
            const adminRef = db.ref("administrators");

            const { id, nombres, apellidos, correo, telefono } = input;

            try {
                // Verificar si el administrador existe
                const snapshot = await adminRef.child(id).once("value");
                if (!snapshot.exists()) {
                    throw new Error("Administrador no encontrado");
                }

                // Actualizar los campos si se proporcionan en el input
                if (nombres) await adminRef.child(id).update({ nombres });
                if (apellidos) await adminRef.child(id).update({ apellidos });
                if (correo) await adminRef.child(id).update({ correo });
                if (telefono) await adminRef.child(id).update({ telefono });

                // Devolver el administrador actualizado
                const updatedSnapshot = await adminRef.child(id).once("value");
                return {
                    id,
                    ...updatedSnapshot.val(),
                };
            } catch (error) {
                console.error("Error al actualizar el administrador:", error);
                throw new Error("Error al actualizar el administrador");
            }
        },

    },
};

module.exports = resolvers;
