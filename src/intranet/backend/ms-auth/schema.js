const { gql } = require("apollo-server");

const typeDefs = gql`
  type Person {
    id: ID!
    nombre: String
    apellido: String
  }

  type Query {
    getPerson(username: String, password: String): Person
  }

  type Mutation {
    login(username: String, password: String): Boolean
  }
`;

module.exports = typeDefs;
