// insertarLogEntry.js
import { generateRandomHash, generateCurrentDate, generateCurrentTime, limpiarFormulario } from './utils';

async function insertarLogEntry() {
    try {
        const respuesta = generateRandomHash();
        const fecha = generateCurrentDate();
        const hora = generateCurrentTime();

        const logEntryInput = {
            respuesta,
            fecha,
            hora,
        };

        const logResponse = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        console.log(generateMensaje());
        console.log("Registro de log insertado:", logData.data.addLogEntry);
        limpiarFormulario();

        // Puedes realizar acciones adicionales después de insertar el registro de log
    } catch (error) {
        console.error("Error al insertar el registro de log:", error);
    }
}

export { insertarLogEntry };
