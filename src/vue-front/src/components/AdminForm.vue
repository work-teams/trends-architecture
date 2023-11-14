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
export default {
    data() {
        return {
            nombres: "",
            apellidos: "",
            correo: "",
            telefono: "",
            administradores: [],
            selectedAdmin: null,
            isEdit: false,
        };
    },
    methods: {
        async agregarAdmin() {
            try {
                const administratorInput = {
                    nombres: this.nombres,
                    apellidos: this.apellidos,
                    correo: this.correo,
                    telefono: this.telefono,
                };

                // Lógica para agregar administrador en la base de datos...
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
                console.error("Error al agregar el administrador:", error);
            }
        },

        async actualizarAdmin() {
            try {
                const adminInput = {
                    id: this.selectedAdmin.id,
                    nombres: this.nombres,
                    apellidos: this.apellidos,
                    correo: this.correo,
                    telefono: this.telefono,
                };

                // Lógica para actualizar administrador en la base de datos...
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
                this.limpiarCampos();
                this.actualizarListaAdmins();
            } catch (error) {
                console.error("Error al actualizar el administrador:", error);
            }
        },

        async actualizarListaAdmins() {
            try {
                // Lógica para obtener la lista actualizada de administradores...
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
            this.isEdit = true;
            this.selectedAdmin = admin;
            this.nombres = admin.nombres;
            this.apellidos = admin.apellidos;
            this.correo = admin.correo;
            this.telefono = admin.telefono;
        },

        limpiarCampos() {
            this.isEdit = false;
            this.selectedAdmin = null;
            this.nombres = "";
            this.apellidos = "";
            this.correo = "";
            this.telefono = "";
        },

        volver() {
            console.log("Volviendo...");
            // Lógica para volver y actualizar la lista de administradores...
            this.actualizarListaAdmins();
        },
    },
    mounted() {
        this.actualizarListaAdmins(); // Llama a la función para cargar la lista cuando la vista esté montada
    }
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
