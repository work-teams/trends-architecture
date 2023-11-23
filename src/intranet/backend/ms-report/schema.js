// ms-report
const { gql } = require("apollo-server");

const typeDefs = gql`
  type Reporte {
	fecha: String
	hora: String
  }
  
  type Query {
    obtenerReportes: [Reporte]
  }
  
  type Mutation {
    actualizarReportes: [Reporte]
  }
`;

module.exports = typeDefs;