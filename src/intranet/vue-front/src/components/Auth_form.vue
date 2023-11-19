<template>
  <div class="container-form d-flex justify-content-center container my-4 shadow p-3 mb-5 bg-white rounded">
    <form @submit.prevent="validarDatos" id="login-form" class="w-100 p-4">
      <div class="mb-3">
        <label for="username" class="form-label">Usuario:</label>
        <input v-model="username" type="text" class="form-control form-control-sm" id="username" name="username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input v-model="password" type="password" class="form-control form-control-sm" id="password" name="password" required />
      </div>
      <div class="d-flex justify-content-around mt-5">
        <button class="btn btn-success px-4" type="submit" id="login-button">
          <i class="fas fa-check-circle mr-2"></i>Iniciar Sesión
        </button>
        <button class="btn btn-dark px-4" type="button" @click="volver" id="volver-button">
          <i class="fas fa-arrow-left mr-2"></i>Volver
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async validarDatos() {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query Login($credentials: AdministratorInput!) {
                Login(credentials: $credentials) {
                  id
                  nombres
                  apellidos
                }
              }
            `,
            variables: {
              credentials: {
                nombres: this.username,
                apellidos: this.password,
              },
            },
          }),
        });

        if (!response.ok) {
          console.error("Error en la solicitud:", response.statusText);
          return;
        }

        const data = await response.json();

        if (data.errors) {
          console.error("Errores en la respuesta GraphQL:", data.errors);
          return;
        }

        if (data.data && data.data.Login) {
          // Autenticación exitosa, puedes acceder a las propiedades del objeto Administrator
          const admin = data.data.Login;
          console.log("Autenticación exitosa, ID:", admin.id, "Nombres:", admin.nombres, "Apellidos:", admin.apellidos);
        } else {
          // Autenticación fallida, puedes mostrar un mensaje de error
          console.error("Autenticación fallida");
        }

        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al procesar la autenticación:", error);
      }
    },

    volver() {
      // Implementa la lógica de retroceso según tus necesidades
    },

    limpiarFormulario() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
    .container-form {
      max-width: 400px;
      margin: 0 auto;
    }
    
    #login-form {
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      margin: 20px auto;
      padding: 40px;
    }
    
    .form-group {
      margin: 50px 0;
    }
    
    label {
      display: block;
      font-weight: bold;
    }
    
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    
    button {
      background-color: #333;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 10px;
      margin-top: 30px;
    }
    
    #login-button {
      background-color: #28a745;
    }
    
    #volver-button {
      background-color: #343a40;
      color: #fff;
    }
    </style>