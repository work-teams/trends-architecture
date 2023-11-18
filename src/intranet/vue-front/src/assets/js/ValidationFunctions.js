export default {
  data() {
    return {
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      dni: '',
      edad: '',
      fechaNacimiento: ''
    };
  },
  methods: {
    async validarDatos() {
      try {
        const respuesta = this.generateRandomHash();
        const fecha = this.generateCurrentDate();
        const hora = this.generateCurrentTime();

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
        console.log(this.generateMensaje());
        console.log("Registro de log insertado:", logData.data.addLogEntry);
        this.limpiarFormulario()
      } catch (error) {
        console.error("Error al insertar el registro de log:", error);
      }
    },

    async volver() {
      await this.obtenerLogEntries();
    },

    generateRandomHash() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },

    generateCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    generateCurrentTime() {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },

    generateMensaje() {
      const numeroAleatorio = Math.floor(Math.random() * 100);
      const esPar = numeroAleatorio % 2 === 0;
      return esPar ? 'Se validó correctamente' : 'Se validó incorrectamente';
    },

    limpiarFormulario() {
      this.nombres = '';
      this.apellidoPaterno = '';
      this.apellidoMaterno = '';
      this.dni = '';
      this.edad = '';
      this.fechaNacimiento = '';
    },

    async obtenerLogEntries() {
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
    },
  },
};