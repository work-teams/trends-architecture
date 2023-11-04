const admin = require("firebase-admin");
const firebaseConfig = require("../../../firebase.json");

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
            const ref = db.ref("persons");
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
    },
};

module.exports = resolvers;
