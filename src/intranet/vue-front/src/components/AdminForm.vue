<template>
    <div class="container">
        <div class="form-container">
            <h2>Gestión de Administradores</h2>
            <div class="form">
                <label>Nombres:</label>
                <input type="text" v-model="nombres" placeholder="Nombres">
                <label>Apellidos:</label>
                <input type="text" v-model="apellidos" placeholder="Apellidos">
                <label>Correo:</label>
                <input type="email" v-model="correo" placeholder="Correo">
                <label>Teléfono:</label>
                <input type="tel" v-model="telefono" placeholder="Teléfono">

                <button @click="agregarAdmin" v-if="!isEdit">Agregar Administrador</button>
                <button @click="actualizarAdmin" v-if="isEdit">Actualizar Administrador</button>
                <button @click="limpiarCampos">Limpiar Campos</button>
                <button @click="volver">Volver</button>
            </div>
        </div>

        <div class="admin-list">
            <h2>Lista de Administradores</h2>
            <ul>
                <li v-for="(admin, index) in administradores" :key="index">
                    {{ admin.nombres }} {{ admin.apellidos }} - {{ admin.correo }} - {{ admin.telefono }}
                    <button @click="seleccionarAdmin(admin)">Editar</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script src="./AdminFunctions.js" />

<style src="./AdminStyle.css" scoped />
