// ms-report
const { gql } = require("apollo-server");

const typeDefs = gql`
  type LogEntry {
    id: ID!
    respuesta: String
    fecha: String
    hora: String
  }

  type LogEntryCounts {
    logEntryCount: Int
  }

  type Query {
    logEntries: [LogEntry]
    logEntryCounts: LogEntryCounts
  }
`;

module.exports = typeDefs;