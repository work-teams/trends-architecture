const admin = require("firebase-admin");
const firebaseConfig = require("../../../../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://usuarios-80f40-default-rtdb.firebaseio.com/",
});

const resolvers = {
  Query: {
    Login: async (_, { username, password }) => {
      // Aquí debes implementar la lógica para autenticar al usuario
      // Puedes comparar el username y el password con los datos almacenados en tu base de datos

      // Ejemplo:
      const db = admin.database();
      const personsRef = db.ref("Administrator");
      const snapshot = await personsRef.orderByChild("nombre").equalTo(username).once("value");
      const personData = snapshot.val();

      // Asumiendo que hay una única persona con el mismo nombre (username)
      const personId = Object.keys(personData)[0];
      const person = personData[personId];

      // Verificar si la contraseña coincide
      if (person && person.apellido === password) {
        return {
          id: personId,
          nombre: person.nombre,
          apellido: person.apellido,
        }; // Autenticación exitosa
      } else {
        return null; // Autenticación fallida
      }
    },
  },
};

module.exports = resolvers;
