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

  type Administrator {
    id: ID!
    nombres: String
    apellidos: String
    correo: String
    telefono: String
  }

  input AdministratorInput {
    nombres: String
    apellidos: String
    correo: String
    telefono: String
  }

  input UpdateAdministratorInput {
    id: ID!
    nombres: String
    apellidos: String
    correo: String
    telefono: String
  }

  input LogEntryInput {
    respuesta: String
    fecha: String
    hora: String
  }

  type Query {
    persons: [Person]
    logEntries: [LogEntry]
    administrators: [Administrator]
  }

  type Mutation {
    addPerson(input: PersonInput): Person
    addLogEntry(input: LogEntryInput): LogEntry
    addAdministrator(input: AdministratorInput): Administrator
    updateAdministrator(input: UpdateAdministratorInput): Administrator
  }
`;

module.exports = typeDefs;
