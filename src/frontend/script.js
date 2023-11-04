document.getElementById("data-validation-form").addEventListener("submit", async function (event) {
    // Evitar la recarga de la página
    event.preventDefault();

    // Genera un hash aleatorio para el campo "respuesta"
    const respuesta = generateRandomHash();

    // Obtiene la fecha y hora del sistema
    const fecha = generateCurrentDate();
    const hora = generateCurrentTime();

    // Realiza la mutación "addLogEntry" para insertar los datos de log
    try {
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
        console.log("Registro de log insertado:", logData.data.addLogEntry);

        // Puedes realizar acciones adicionales después de insertar el registro de log
    } catch (error) {
        console.error("Error al insertar el registro de log:", error);
    }
});


// Función para generar un hash aleatorio (puedes usar una librería de generación de hash)
function generateRandomHash() {
    // Implementa la generación de un hash aleatorio según tus necesidades
    // Esto es solo un ejemplo básico
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Función para obtener la fecha actual como cadena (en el formato que necesites)
function generateCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función para obtener la hora actual como cadena (en el formato que necesites)
function generateCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}


document.getElementById("volver-button").addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        console.log("Registros de log:");
        console.log(logEntries);
    } catch (error) {
        console.error("Error al obtener los registros de log:", error);
    }
});