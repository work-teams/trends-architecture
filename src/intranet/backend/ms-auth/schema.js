const { gql } = require("apollo-server");

const typeDefs = gql`
  type Administrator {
    id: ID!
    nombre: String
    apellido: String
  }

  type Query {
    Login(username: String, password: String): Administrator
  }

`;

module.exports = typeDefs;
