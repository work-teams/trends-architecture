class RegistroEventos {
    constructor(apiURL) {
      this.apiURL = apiURL;
    }
  
    // Registra evento del formulario de validación de datos sensibles.
    async registrarEventoData(respuesta, fecha, hora) {
        try {
            const logEntryInput = {
                respuesta,
                fecha,
                hora,
            };

            const logResponse = await fetch('https://msbacksen.onrender.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation AddLogEntry($input: LogEntryInput) {
                        addLogEntry(input: $input) {
                            id
                            respuesta
                            fecha
                            hora
                        }
                        }
                    `,
                    variables: {
                        input: logEntryInput,
                    },
                }),
            });
            const logData = await logResponse.json();
            console.log('Registro de log insertado:', logData.data.addLogEntry);
        } catch (error) {
            console.error('Error al insertar el registro de log:', error);
        }
    }

    // Registra evento de la vista de validación facial sensibles.
    async registrarEventoFacial(respuesta, fecha, hora){
        try{
            const logEntryInput = {
                respuesta,
                fecha,
                hora,
            };
        
            const logResponse = await fetch('https://msvalfac.onrender.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation AddLogEntry($input: LogEntryInput) {
                        addLogEntry(input: $input) {
                            id
                            respuesta
                            fecha
                            hora
                        }
                        }
                    `,
                    variables: {
                        input: logEntryInput,
                    },
                }),
            });
        
            const logData = await logResponse.json();
            console.log('Registro de log insertado:', logData.data.addLogEntry);
        } catch (error) {
            console.error('Error al insertar el registro de log:', error);
        }
    }

    // Listar Registros
    async obtenerLogEntries() {
        try {
            const response = await fetch('https://msbacksen.onrender.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query GetLogEntries {
                        logEntries {
                            id
                            respuesta
                            fecha
                            hora
                        }
                        }
                    `,
                }),
            });
            const data = await response.json();
            const logEntries = data.data.logEntries;
            console.log('Registros de log:');
            console.log(logEntries);
        } catch (error) {
            console.error('Error al obtener los registros de log:', error);
        }
    }
}

export default RegistroEventos;