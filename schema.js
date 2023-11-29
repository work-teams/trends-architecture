const { gql } = require("apollo-server");

const typeDefs = gql`

type Administrator {
  id: ID!
  nombres: String
  apellidos: String
}

input AdministratorInput {
  nombres: String
  apellidos: String
}

type Query {  
  Login(credentials: AdministratorInput!): Administrator
}

`;

module.exports = typeDefs;
