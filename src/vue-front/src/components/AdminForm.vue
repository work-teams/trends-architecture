<template>
    <div>
        <h2>Crear Administrador</h2>
        <div class="form">
            <input type="text" v-model="nombres" placeholder="Nombres">
            <input type="text" v-model="apellidos" placeholder="Apellidos">
            <input type="email" v-model="correo" placeholder="Correo">
            <input type="tel" v-model="telefono" placeholder="Teléfono">
            <button @click="agregarAdmin">Agregar Administrador</button>
            <button @click="volver">Volver</button>
        </div>

        <h2>Lista de Administradores</h2>
        <div class="admin-list">
            <ul>
                <li v-for="(admin, index) in administradores" :key="index">
                    {{ admin.nombres }} {{ admin.apellidos }} - {{ admin.correo }} - {{ admin.telefono }}
                    <button @click="seleccionarAdmin(admin)">Seleccionar</button>
                </li>
            </ul>
        </div>

        <h2>Datos del Administrador Seleccionado</h2>
        <div class="selected-admin">
            <input type="text" v-model="selectedAdmin.nombres" placeholder="Nombres">
            <input type="text" v-model="selectedAdmin.apellidos" placeholder="Apellidos">
            <input type="email" v-model="selectedAdmin.correo" placeholder="Correo">
            <input type="tel" v-model="selectedAdmin.telefono" placeholder="Teléfono">
            <button @click="actualizarAdmin">Actualizar Datos</button>
            <button @click="limpiarCampos">Limpiar Campos</button>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            nombres: "",
            apellidos: "",
            correo: "",
            telefono: "",
            administradores: [],
            selectedAdmin: {
                id: null,
                nombres: "",
                apellidos: "",
                correo: "",
                telefono: ""
            }
        };
    },
    methods: {
        async agregarAdmin() {
            try {
                const administratorInput = {
                    nombres: this.nombres,
                    apellidos: this.apellidos,
                    correo: this.correo,
                    telefono: this.telefono
                };

                const adminResponse = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: `
                mutation AddAdministrator($input: AdministratorInput) {
                  addAdministrator(input: $input) {
                    id
                    nombres
                    apellidos
                    correo
                    telefono
                  }
                }
              `,
                        variables: {
                            input: administratorInput
                        }
                    })
                });

                const adminData = await adminResponse.json();
                console.log("Registro de administrador insertado:", adminData.data.addAdministrator);

                this.limpiarFormulario();
                this.actualizarListaAdmins();
            } catch (error) {
                console.error("Error al insertar el registro de administrador:", error);
            }
        },

        async actualizarListaAdmins() {
            try {
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: `
                query GetAdministrators {
                  administrators {
                    id
                    nombres
                    apellidos
                    correo
                    telefono
                  }
                }
              `
                    })
                });

                const data = await response.json();
                this.administradores = data.data.administrators;
            } catch (error) {
                console.error("Error al obtener administradores:", error);
            }
        },

        limpiarFormulario() {
            this.nombres = "";
            this.apellidos = "";
            this.correo = "";
            this.telefono = "";
        },

        seleccionarAdmin(admin) {
            // Copiar los datos del admin seleccionado a selectedAdmin
            this.selectedAdmin = { ...admin };
        },

        async actualizarAdmin() {
            try {
                const adminInput = {
                    id: this.selectedAdmin.id,
                    nombres: this.selectedAdmin.nombres,
                    apellidos: this.selectedAdmin.apellidos,
                    correo: this.selectedAdmin.correo,
                    telefono: this.selectedAdmin.telefono
                };

                const adminResponse = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: `
                mutation UpdateAdministrator($input: UpdateAdministratorInput) {
                  updateAdministrator(input: $input) {
                    id
                    nombres
                    apellidos
                    correo
                    telefono
                  }
                }
              `,
                        variables: {
                            input: adminInput
                        }
                    })
                });

                const updatedAdmin = await adminResponse.json();
                console.log("Administrador actualizado:", updatedAdmin.data.updateAdministrator);

                // Actualizar lista de administradores después de la actualización
                this.actualizarListaAdmins();
            } catch (error) {
                console.error("Error al actualizar el administrador:", error);
            }
        },

        limpiarCampos() {
            // Limpiar los campos del administrador seleccionado
            this.selectedAdmin = {
                id: null,
                nombres: "",
                apellidos: "",
                correo: "",
                telefono: ""
            };
        },

        async volver() {
            console.log("Volviendo...");
            // Actualizar la lista de administradores al volver
            this.actualizarListaAdmins();
        }
    }
};
</script>
  
<style scoped>
/* Estilos aquí */
</style>
  
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.form {
    text-align: center;
}

form {
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
    margin-top: 20px;
    max-width: 800px;
    margin: 0 auto;
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
    /* Hacer que cada elemento ocupe todo el ancho disponible */
}
</style>
