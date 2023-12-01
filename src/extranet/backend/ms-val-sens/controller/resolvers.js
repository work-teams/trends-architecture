import {generateRandomHash, generateCurrentDate, generateCurrentTime, generateMensaje} from '../infrastructure/reniecAPI'

const admin = require("firebase-admin");
const firebaseConfig = require("../infrastructure/firebaseConfig");

// Configura Firebase
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://usuarios-80f40-default-rtdb.firebaseio.com/",
});

const resolvers = {
    Query: {
        logEntries: async () => {
            const db = admin.database();
            const logRef = db.ref("logs");
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
        addLogEntry: async (_, { input }) => {
            try {
                const db = admin.database();
                const logRef = db.ref("logs");

                // Utiliza las funciones proporcionadas por API-RENIEC
                input.respuesta = generateRandomHash();
                input.fecha = generateCurrentDate();
                input.hora = generateCurrentTime();
                input.mensaje = generateMensaje();

                // Inserta los datos actualizados del input en la base de datos
                const newLogRef = logRef.push();
                await newLogRef.set(input);

                return {
                    id: newLogRef.key,
                    ...input,
                };
            } catch (error) {
                console.error('Error al insertar el registro de log:', error.message);
                throw new Error('No se pudo agregar el registro de log. Consulta los registros para más detalles.');
            }
        },
    },
};

module.exports = resolvers;
