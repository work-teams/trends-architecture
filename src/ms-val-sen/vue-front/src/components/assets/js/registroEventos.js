class RegistroEventos {
  constructor(apiURL) {
    this.apiURL = apiURL;
    this.graphQLURL = "http://localhost:4000/graphql";
  }

  async _fetchData(query, variables = {}) {
    try {
      const response = await fetch(this.graphQLURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      throw error;
    }
  }

  async registrarEvento(respuesta, fecha, hora) {
    try {
      const logEntryInput = {
        respuesta,
        fecha,
        hora,
      };

      const query = `
        mutation AddLogEntry($input: LogEntryInput) {
          addLogEntry(input: $input) {
            id
            respuesta
            fecha
            hora
          }
        }
      `;

      const variables = {
        input: logEntryInput,
      };

      const data = await this._fetchData(query, variables);
      const logEntry = data.data.addLogEntry;

      console.log("Registro de log insertado:", logEntry);
      return logEntry;
    } catch (error) {
      console.error("Error al insertar el registro de log:", error);
      throw error;
    }
  }

  async obtenerLogEntries() {
    try {
      const query = `
        query GetLogEntries {
          logEntries {
            id
            respuesta
            fecha
            hora
          }
        }
      `;

      const data = await this._fetchData(query);
      const logEntries = data.data.logEntries;

      console.log("Registros de log:");
      console.log(logEntries);
      return logEntries;
    } catch (error) {
      console.error("Error al obtener los registros de log:", error);
      throw error;
    }
  }
}

export default RegistroEventos;
