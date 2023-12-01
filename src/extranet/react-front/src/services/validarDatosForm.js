// api.js
const API_ENDPOINT = 'https://msbacksen.onrender.com/graphql';

const validarDatosForm = async (logFormInput) => {
  try {
    const logResponse = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LogEntryInput,
        variables: {
          input: logFormInput,
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

export { validarDatosForm };
