<template>
  <div class="d-flex justify-content-center align-items-center bg-dark text-white">
    <img class="mx-4" alt="Vue logo" src="../public/logo/logo.png" width="75" height="75">
    <h2 class="p-3">Formulario de Validación de Datos Personales</h2>
  </div>
  <DataValidationForm />
</template>

<script>
import DataValidationForm from './components/DataValidationForm.vue';

export default {
  name: 'App',
  components: {
    DataValidationForm
  }
}
</script>

<style>
@import '../src/components/assets/css/styles.css';
</style>
