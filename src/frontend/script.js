// document.getElementById("validar-button").addEventListener("click", function () {
//     // Realiza la validación de datos aquí
//     // Por ejemplo, puedes verificar que los campos no estén vacíos y que el DNI sea válido.
//     // Puedes personalizar esta parte según tus requisitos de validación.
//     console.log('Validando...')
// });



document.getElementById("data-validation-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar la recarga de la página

    const formData = new FormData(this);

    const input = {
        nombres: formData.get("nombres"),
        apellidoPaterno: formData.get("apellido-paterno"),
        apellidoMaterno: formData.get("apellido-materno"),
        dni: formData.get("dni"),
        edad: parseInt(formData.get("edad")),
        fechaNacimiento: formData.get("fecha-nacimiento"),
    };

    try {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
            mutation AddPerson($input: PersonInput) {
              addPerson(input: $input) {
                id
                nombres
                apellidoPaterno
                apellidoMaterno
                dni
                edad
                fechaNacimiento
              }
            }
          `,
                variables: {
                    input,
                },
            }),
        });

        const data = await response.json();
        console.log("Registro insertado:", data.data.addPerson);

        // Puedes realizar acciones adicionales después de insertar el registro
    } catch (error) {
        console.error("Error al insertar el registro:", error);
    }
});











document.getElementById("volver-button").addEventListener("click", function () {
    // Puedes agregar código aquí para volver a la página anterior o realizar otras acciones.
    console.log('Volviendo...')
});
