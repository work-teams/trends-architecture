const admin = require("firebase-admin");
const firebaseConfig = require("../../../../firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://usuarios-80f40-default-rtdb.firebaseio.com/",
});

const resolvers = {
    Query: {
        getPerson: async (_, { username, password }) => {
            // Aquí debes implementar la lógica para obtener la persona según el username y el password
            // Puedes realizar una consulta a tu base de datos y devolver el nombre y el apellido

            // Ejemplo:
            const db = admin.database();
            const personsRef = db.ref("persons");
            const snapshot = await personsRef.orderByChild("nombre").equalTo(username).once("value");
            const personData = snapshot.val();

            // Asumiendo que hay una única persona con el mismo nombre (username)
            const personId = Object.keys(personData)[0];
            const person = personData[personId];

            return {
                id: personId,
                nombre: person.nombre,
                apellido: person.apellido,
            };
        },
    },
    Mutation: {
        login: async (_, { username, password }) => {
            // Aquí debes implementar la lógica para autenticar al usuario
            // Puedes comparar el username y el password con los datos almacenados en tu base de datos

            // Ejemplo:
            const db = admin.database();
            const personsRef = db.ref("persons");
            const snapshot = await personsRef.orderByChild("nombre").equalTo(username).once("value");
            const personData = snapshot.val();

            // Asumiendo que hay una única persona con el mismo nombre (username)
            const personId = Object.keys(personData)[0];
            const person = personData[personId];

            // Verificar si la contraseña coincide
            if (person && person.apellido === password) {
                return true; // Autenticación exitosa
            } else {
                return false; // Autenticación fallida
            }
        },
    },
};

module.exports = resolvers;
