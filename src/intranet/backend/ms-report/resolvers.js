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
    logEntries: async () => {
      const db = admin.database();
      const logRef = db.ref("logs");
  
      // Utiliza orderByChild para ordenar por la propiedad 'fechaHora' (ajusta el nombre según tu estructura)
      const snapshot = await logRef.orderByChild('fechaHora').once("value");
  
      const data = snapshot.val();
      const logEntries = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
      }));
  
      return logEntries;
  },  
    logEntryCounts: async () => {
      const db = admin.database();
      const logRef = db.ref("logs");

      const snapshot = await logRef.orderByChild('fechaHora').once("value");
      const data = snapshot.val();

      // Obtén el recuento de registros
      const count = Object.keys(data).length;

      return count;
    },
  },
};

module.exports = resolvers;