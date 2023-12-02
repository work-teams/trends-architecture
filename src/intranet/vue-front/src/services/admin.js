import { query } from "express";

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
                const adminResponse = await fetch("https://msbackendadmin.onrender.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: query,
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
                const adminResponse = await fetch("https://msbackendadmin.onrender.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: query,
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
                const response = await fetch("https://msbackendadmin.onrender.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: query
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
            this.$router.push('/reports'); // Redirige a la vista de informes
        },
    },
    mounted() {
        this.actualizarListaAdmins(); // Llama a la función para cargar la lista cuando la vista esté montada
    }
};