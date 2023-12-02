import { generateCurrentDate, generateCurrentTime, generateMensaje } from '../infrastructura/reniecAPI';

const admin = require('firebase-admin');
const firebaseConfig = require('../infrastructure/firebaseConfig'); // Ajusta la ruta según la ubicación real de tu archivo de configuración

// Configura Firebase
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://usuarios-80f40-default-rtdb.firebaseio.com/',
});

const resolvers = {
  Query: {
    // Aquí puedes tener métodos de consulta para las notificaciones si las necesitas
    notificationEntries: async () => {
      const db = admin.database();
      const notificationRef = db.ref('notifications');
      const snapshot = await notificationRef.once('value');
      const data = snapshot.val();
      const notificationEntries = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return notificationEntries;
    },
  },
  Mutation: {
    addNotification: async (_, { input }) => {
      try {
        const db = admin.database();
        const notificationRef = db.ref('notifications');

        // Utiliza las funciones proporcionadas por API-RENIEC
        input.fecha = generateCurrentDate();
        input.hora = generateCurrentTime();
        input.mensaje = generateMensaje();

        // Inserta los datos actualizados del input en la base de datos
        const newNotificationRef = notificationRef.push();
        await newNotificationRef.set(input);

        return {
          id: newNotificationRef.key,
          ...input,
        };
      } catch (error) {
        console.error('Error al insertar la notificación:', error.message);
        throw new Error('No se pudo agregar la notificación. Consulta los registros para más detalles.');
      }
    },
  },
};

module.exports = resolvers;
