const { gql } = require("apollo-server");

const typeDefs = gql`

  type LogEntry {
    id: ID!
    respuesta: String
    fecha: String
    hora: String
  }

   input LogEntryInput {
    respuesta: String
    fecha: String
    hora: String
  }

  type Query {
    logEntries: [LogEntry]
  }

  type Mutation {
    addLogEntry(input: LogEntryInput): LogEntry
  }
`;

module.exports = typeDefs;
