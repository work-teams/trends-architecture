const admin = require("firebase-admin");
const firebaseConfig = require("../../../../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://usuarios-80f40-default-rtdb.firebaseio.com/",
});

const resolvers = {
    Query: {
      Login: async (_, { credentials }) => {
        const { nombres, apellidos } = credentials;
        const db = admin.database();
        const ref = db.ref("administrators");
  
        // Realiza una consulta para encontrar al administrador con las credenciales proporcionadas
        const snapshot = await ref
          .orderByChild("nombres")
          .equalTo(nombres)
          .once("value");
  
        const adminData = snapshot.val();
  
        // Filtra los administradores con los apellidos proporcionados
        const matchingAdmins = adminData
          ? Object.entries(adminData).filter(([_, admin]) => admin.apellidos === apellidos)
          : [];
  
        // Verifica si se encontró un administrador con las credenciales proporcionadas
        if (matchingAdmins.length > 0) {
          const [adminId, admin] = matchingAdmins[0];
          return {
            id: adminId,
            ...admin,
          };
        } else {
          // Si no se encuentra ningún administrador, puedes devolver null o lanzar un error según tus necesidades
          return null;
        }
      },
    },
  };

module.exports = resolvers;
