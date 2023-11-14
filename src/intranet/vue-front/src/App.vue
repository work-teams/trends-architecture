<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <DataValidationForm /> -->
  <AdminForm />
</template>

<script>
// import DataValidationForm from './components/DataValidationForm.vue';
import AdminForm from './components/AdminForm.vue';

export default {
  name: 'App',
  components: {
    // DataValidationForm
    AdminForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
