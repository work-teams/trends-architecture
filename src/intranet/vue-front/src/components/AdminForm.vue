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

<script>
import AdminFormLogic from "../services/admin";

export default {
    mixins: [AdminFormLogic],
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* Alinear elementos en la parte superior */
    height: 100vh;
    margin-top: 20px;
    /* Ajustar el margen superior según tus necesidades */
}

.form-container {
    margin-right: 20px;
    /* Espaciado entre el formulario y la lista */
}

.form {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    max-width: 300px;
    margin: 0 auto;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-top: 10px;
    padding: 8px 15px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
}

.admin-list {
    border: 1px solid #ccc;
    padding: 10px;
    overflow-y: auto;
    /* Agregado para la barra de desplazamiento vertical */
    max-height: 600px;
    /* Altura máxima para la lista antes de agregar la barra de desplazamiento */
    max-width: 1000px;
}

ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

li {
    margin-bottom: 10px;
    background-color: #ecf0f1;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
}
</style>
