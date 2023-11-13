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
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            nombres: '',
            apellidos: '',
            correo: '',
            telefono: '',
            administradores: [] // Array para almacenar los administradores creados
        };
    },
    methods: {
        async agregarAdmin() {
            try {
                const AdministratorInput = {
                    nombres: this.nombres,
                    apellidos: this.apellidos,
                    correo: this.correo,
                    telefono: this.telefono
                };

                const adminResponse = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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
                            input: AdministratorInput,
                        },
                    }),
                });

                const adminData = await adminResponse.json();
                console.log("Registro de administrador insertado:", adminData.data.addAdministrator);
                this.limpiarFormulario()
            } catch (error) {
                console.error("Error al insertar el registro de administrador:", error);
            }
            // this.administradores.push(nuevoAdmin);
            // console.log('Administrador agregado:', nuevoAdmin);
        },

        limpiarFormulario() {
            this.nombres = '';
            this.apellidos = '';
            this.correo = '';
            this.telefono = '';
        },

        async volver() {
            console.log('Volviendo...');
            try {
                const response = await fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
                    }),
                });

                const data = await response.json();
                this.administradores = data.data.administrators;
            } catch (error) {
                console.error('Error al obtener administradores:', error);
            }
        }
    }
};
</script>

<style scoped>
.form {
    margin-bottom: 20px;
}

input {
    margin-bottom: 10px;
    padding: 5px;
}

button {
    margin-right: 10px;
    padding: 8px 15px;
    cursor: pointer;
}

.admin-list {
    border: 1px solid #ccc;
    padding: 10px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}
</style>
