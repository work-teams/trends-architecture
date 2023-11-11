async function obtenerLogEntries() {
  try {
    const response = await fetch("https://msbacksen.onrender.com/graphql", {
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
}

export { obtenerLogEntries };
