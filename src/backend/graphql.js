const { ApolloServer, gql } = require("apollo-server");
const admin = require("firebase-admin");

// Configura Firebase
const serviceAccount = require("../../firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://usuarios-80f40-default-rtdb.firebaseio.com/",
});

// Define el esquema GraphQL
const typeDefs = gql`
  type Person {
    id: ID!
    nombres: String
    apellidoPaterno: String
    apellidoMaterno: String
    dni: String
    edad: Int
    fechaNacimiento: String
  }

  input PersonInput {
    nombres: String
    apellidoPaterno: String
    apellidoMaterno: String
    dni: String
    edad: Int
    fechaNacimiento: String
  }

  type Query {
    persons: [Person]
  }

  type Mutation {
    addPerson(input: PersonInput): Person
  }
`;

// Resolvers
const resolvers = {
  Query: {
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
  },
  Mutation: {
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
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
