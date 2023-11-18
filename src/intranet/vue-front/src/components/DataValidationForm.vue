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
  
<script src="./ValidationFunctions.js" />

<style src="./ValidationStyle.css" scoped />
  

  