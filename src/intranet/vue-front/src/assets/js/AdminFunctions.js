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