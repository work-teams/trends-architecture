<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <DataValidationForm /> -->
  <AuthForm/>
</template>

<script>
// import DataValidationForm from './components/DataValidationForm.vue';
import AuthForm  from './components/Auth_form.vue';

export default {
  name: 'App',
  components: {
    // DataValidationForm
    AuthForm 
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
