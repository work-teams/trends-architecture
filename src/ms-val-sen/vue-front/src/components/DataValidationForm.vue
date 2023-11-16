<template>
  <div class="container-form d-flex justify-content-center container my-4 shadow p-3 mb-5 bg-white rounded">
    <form @submit.prevent="registrarEventoVD" id="data-validation-form" class="w-100 p-4">
      <div class="mb-3">
        <label for="nombres" class="form-label">Nombres:</label>
        <input v-model="nombres" @input="validarTexto($event, 'nombres')" type="text" class="form-control form-control-sm" id="nombres" name="nombres" required />
      </div>
      <div class="mb-3">
        <label for="apellido-paterno" class="form-label">Apellido Paterno:</label>
        <input v-model="apellidoPaterno" @input="validarTexto($event, 'apellidoPaterno')" type="text" class="form-control form-control-sm" id="apellido-paterno" name="apellido-paterno" required />
      </div>
      <div class="mb-3">
        <label for="apellido-materno" class="form-label">Apellido Materno:</label>
        <input v-model="apellidoMaterno" @input="validarTexto($event, 'apellidoMaterno')" type="text" class="form-control form-control-sm" id="apellido-materno" name="apellido-materno" required />
      </div>
      <div class="mb-3">
        <label for="dni" class="form-label">DNI:</label>
        <input v-model="dni" @input="validarNumero($event, 'dni')" type="text" class="form-control form-control-sm" pattern="[0-9]{8}" inputmode="numeric" id="dni" name="dni" maxlength="8" required />
      </div>
      <div class="mb-3">
        <label for="edad" class="form-label">Edad:</label>
        <input v-model="edad" type="number" class="form-control form-control-sm" id="edad" name="edad"  min="18" max="99" required />
      </div>
      <div class="mb-3">
        <label for="fecha-nacimiento" class="form-label">Fecha de Nacimiento:</label>
        <input v-model="fechaNacimiento" @blur="validarEdadFecha" type="date" class="form-control form-control-sm" id="fecha-nacimiento" name="fecha-nacimiento" required />
      </div>
      <div class="d-flex justify-content-around mt-5">
        <button class="btn btn-success px-4" type="submit" id="validar-button"><i class="fa-regular fa-circle-check mr-2"></i>Validar</button>
        <button class="btn btn-dark px-4" type="button" @click="volver" id="volver-button"><i class="fa-solid fa-arrow-left mr-2"></i>Volver</button>
      </div>
    </form>
  </div>
</template>

<script>
import RegistroEventos from './assets/js/registroEventos.js';

const registroEventos = new RegistroEventos();

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
    validarTexto(event, campo) {
      // Verificar si se presionó la tecla de retroceso o borrar
      const esTeclaBorrar = event.inputType === 'deleteContentBackward' || event.code === 'Backspace';

      // Expresión regular para permitir solo letras y espacios
      const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;

      if (!esTeclaBorrar && !regex.test(event.target.value)) {
        this[campo] = event.target.value.slice(0, -1);
        alert('Este campo solo admite texto');
      }
    },

    validarNumero(event, campo) {
      // Verificar si se presionó la tecla de retroceso o borrar
      const esTeclaBorrar = event.inputType === 'deleteContentBackward' || event.code === 'Backspace';

      // Expresión regular para permitir solo letras y espacios
      const regex = /^[0-9]+$/;

      if (!esTeclaBorrar && !regex.test(event.target.value)) {
        this[campo] = event.target.value.slice(0, -1);
        alert('Este campo solo adminte numero');
      }
    },

    validarEdadFecha() {
      const fechaIngresada = new Date(this.fechaNacimiento);
      const ahora = new Date();
      let edad = ahora.getFullYear() - fechaIngresada.getFullYear();

      // Verificar si aún no se ha cumplido el aniversario de este año
      if (
        fechaIngresada.getMonth() > ahora.getMonth() ||
        (fechaIngresada.getMonth() === ahora.getMonth() && fechaIngresada.getDate() > ahora.getDate())
      ) {
        edad--;
      }

      if (edad !== parseInt(this.edad, 10)) {
        alert('La edad no coincide con la fecha de nacimiento.');
        this.fechaNacimiento = ''; // Limpiar campo fecha de nacimiento
      }
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

    async registrarEventoVD() {
      try {
        const respuesta = this.generateRandomHash();
        const fecha = this.generateCurrentDate();
        const hora = this.generateCurrentTime();

        await registroEventos.registrarEvento(respuesta, fecha, hora);
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al enviar respuesta", error);
      }
    },

    async volver() {
      await registroEventos.obtenerLogEntries();
    },
  },
};
</script>