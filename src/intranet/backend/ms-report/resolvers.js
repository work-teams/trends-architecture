// ms-report

const admin = require("firebase-admin");
const firebaseConfig = require("../../../../firebase.json");

// Configura Firebase
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://usuarios-80f40-default-rtdb.firebaseio.com/",
});

const resolvers = {
  Query: {
    obtenerReportes: async () => {
      try {
        // Lógica para obtener reportes desde Firebase
        const firestore = admin.firestore();
        const reportesRef = firestore.collection('logs');
        const reportesSnapshot = await reportesRef.get();

        const reportes = [];
        reportesSnapshot.forEach(doc => {
          const data = doc.data();
          reportes.push({
            fecha: data.fecha,
            hora: data.hora,
            // Agregar otros campos según tu estructura en Firebase
          });
        });

        return reportes;
      } catch (error) {
        // Manejar errores
        console.error('Error al obtener reportes:', error);
        throw new Error('Error al obtener reportes');
      }
    },
  },
  
  Mutation: {
    actualizarReportes: async () => {
      try {
        // Lógica para obtener reportes desde Firebase
        const firestore = admin.firestore();
        const reportesRef = firestore.collection('logs');
        const reportesSnapshot = await reportesRef.get();

        const reportes = [];
        reportesSnapshot.forEach(doc => {
          const data = doc.data();
          reportes.push({
            fecha: data.fecha,
            hora: data.hora,
          });
        });

        return reportes;
      } catch (error) {
        // Manejar errores
        console.error('Error al obtener actualización de reportes', error);
        throw new Error('Error al obtener actualización de reportes');
      }
    },
  },
};

module.exports = resolvers;