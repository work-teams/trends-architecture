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
        const respuesta = this.generateRandomHash();
        const fecha = this.generateCurrentDate();
        const hora = this.generateCurrentTime();

      } catch (error) {
        console.error("Error al insertar el registro de log:", error);
      }
    },

    async volver() {
      await this.obtenerLogEntries();
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
  