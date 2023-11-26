<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ReportsLog v-if="showReportsLog" />
    <DataValidationForm v-if="showDataValidationForm" />
    <AdminForm v-if="showAdminForm" />
    <Auth_Form v-if="showAuthForm" />
  </div>
</template>

<script>
import DataValidationForm from './components/DataValidationForm.vue';
import ReportsLog from './components/ReportsLog.vue';
import AdminForm from './components/AdminForm.vue';
import Auth_Form from './components/Auth_form.vue';

export default {
  name: 'App',
  components: {
    DataValidationForm,
    ReportsLog,
    AdminForm,
    Auth_Form,

  },
  data() {
    return {
      showDataValidationForm: false,
      showReportsLog: true,
      showAdminForm: false,
      showAuthForm: false,
    };
  },
  methods: {
    showReports() {
      this.showReportsLog = true;
      this.showDataValidationForm = false;
      this.showAdminForm = false;
      this.showAuthForm = false;
    },
    showDataForm() {
      this.showReportsLog = false;
      this.showDataValidationForm = true;
      this.showAdminForm = false;
      this.showAuthForm = false;
    },
    showAdmin() {  // Cambié el nombre de la función
      this.showReportsLog = false;
      this.showDataValidationForm = false;
      this.showAdminForm = true;
      this.showAuthForm = false;
    },
    showAuth() {  // Cambié el nombre de la función
      this.showReportsLog = false;
      this.showDataValidationForm = false;
      this.showAdminForm = false;
      this.showAuthForm = true;
    },
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