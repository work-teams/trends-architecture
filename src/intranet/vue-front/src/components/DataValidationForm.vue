<template>
  <div>
    <h1>Formulario de Validación de Datos Personales</h1>
    <form @submit.prevent="validarDatos" id="data-validation-form">
      <div class="form-group">
        <label for="nombres">Nombres:</label>
        <input v-model="nombres" type="text" id="nombres" name="nombres" required />
      </div>
      <div class="form-group">
        <label for="apellido-paterno">Apellido Paterno:</label>
        <input v-model="apellidoPaterno" type="text" id="apellido-paterno" name="apellido-paterno" required />
      </div>
      <div class="form-group">
        <label for="apellido-materno">Apellido Materno:</label>
        <input v-model="apellidoMaterno" type="text" id="apellido-materno" name="apellido-materno" required />
      </div>
      <div class="form-group">
        <label for="dni">DNI:</label>
        <input v-model="dni" type="text" id="dni" name="dni" required />
      </div>
      <div class="form-group">
        <label for="edad">Edad:</label>
        <input v-model="edad" type="number" id="edad" name="edad" required />
      </div>
      <div class="form-group">
        <label for="fecha-nacimiento">Fecha de Nacimiento:</label>
        <input v-model="fechaNacimiento" type="date" id="fecha-nacimiento" name="fecha-nacimiento" required />
      </div>
      <div class="form-group">
        <button type="submit" id="validar-button">Validar</button>
        <button type="button" @click="volver" id="volver-button">Volver</button>
      </div>
    </form>
  </div>
</template>
  
<script>
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
        const respuesta = this.generateRandomHash();  // nombre
        const fecha = this.generateCurrentDate();     // apellido 
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
</script>
  
<style scoped>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
}

h1 {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

form {
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  padding: 20px;
  max-width: 400px;
}

.form-group {
  margin: 10px 0;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

#validar-button {
  background-color: #4CAF50;
}

#volver-button {
  background-color: #FF5722;
}
</style>
  