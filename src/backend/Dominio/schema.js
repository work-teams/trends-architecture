const { gql } = require("apollo-server");


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

  type LogEntry {
    id: ID!
    respuesta: String
    fecha: String
    hora: String
  }

  input PersonInput {
    nombres: String
    apellidoPaterno: String
    apellidoMaterno: String
    dni: String
    edad: Int
    fechaNacimiento: String
  }

  input LogEntryInput {
    respuesta: String
    fecha: String
    hora: String
  }

  type Query {
    persons: [Person]
    logEntries: [LogEntry]
  }

  type Mutation {
    addPerson(input: PersonInput): Person
    addLogEntry(input: LogEntryInput): LogEntry
  }
`;

module.exports = typeDefs;
