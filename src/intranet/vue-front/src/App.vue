<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ReportsLog v-if="showReportsLog" />
    <DataValidationForm v-if="showDataValidationForm" />
    <AdminForm v-if="showAdminForm" />
  </div>
</template>

<script>
import DataValidationForm from './components/DataValidationForm.vue';
import ReportsLog from './components/ReportsLog.vue';
import AdminForm from './components/AdminForm.vue';

export default {
  name: 'App',
  components: {
    ReportsLog,
    DataValidationForm,
    AdminForm,
  },
  data() {
    return {
      showReportsLog: true,
      showDataValidationForm: false,
      showAdminForm: false,
    };
  },
  methods: {
    showReports() {
      this.showReportsLog = true;
      this.showDataValidationForm = false;
      this.showAdminForm = false;
    },
    showDataForm() {
      this.showReportsLog = false;
      this.showDataValidationForm = true;
      this.showAdminForm = false;
    },
    showAdmin() {
      this.showReportsLog = false;
      this.showDataValidationForm = false;
      this.showAdminForm = true;
    },
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
