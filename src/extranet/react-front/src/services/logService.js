const addLogEntry = async (logEntryInput) => {
    try {
        const logResponse = await fetch('http://localhost:4000/graphql', {
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
        return logData.data.addLogEntry;
    } catch (error) {
        console.error('Error al insertar el registro de log:', error);
        throw error;
    }
};

export { addLogEntry };