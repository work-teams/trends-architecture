<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <Auth_Form /> -->
    <ReportsLog />
    <!-- <AdminForm /> -->
  </div>
</template>

<script>
// import Auth_Form from './components/Auth_form.vue';
import ReportsLog from './components/ReportsLog.vue';
// import AdminForm from './components/AdminForm.vue';

export default {
  name: 'App',
  components: {
    // Auth_Form,
    ReportsLog,
    // AdminForm,

  },
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