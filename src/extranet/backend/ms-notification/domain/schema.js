const { gql } = require('apollo-server');

const typeDefs = gql`
  type Notification {
    id: ID!
    fecha: String
    hora: String
    mensaje: String
    # Otros campos que puedan ser necesarios para la notificación
  }

  input NotificationInput {
    fecha: String
    hora: String
    mensaje: String
    # Otros campos de entrada para la notificación
  }

  type Query {
    notificationEntries: [Notification]
    # Otros métodos de consulta para las notificaciones si es necesario
  }

  type Mutation {
    addNotification(input: NotificationInput): Notification
    # Otros métodos de mutación para las notificaciones
  }
`;

module.exports = typeDefs;
