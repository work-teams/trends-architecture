const cargarDatosEnCampos = (usuario) => {
    // Rellenar los campos de edición con los datos del usuario
    document.querySelector('#firstname').value = usuario.firstname;
    document.querySelector('#lastname').value = usuario.lastname;
    document.querySelector('#email').value = usuario.email;
    document.querySelector('#phone').value = usuario.phone;
};

document.querySelector('#edit-button').addEventListener('click', () => {
    // Obtener el ID del usuario que se va a editar
    const usuarioId = obtenerIdDelUsuarioAEditar();

    // Realizar una solicitud para obtener los datos del usuario con el ID seleccionado
    obtenerDatosDelUsuario(usuarioId);
});

// Función para obtener los datos del usuario para edición
const obtenerDatosDelUsuario = async (usuarioId) => {
    try {
        const response = await fetch(`/api/users/${usuarioId}`);
        if (response.ok) {
            const usuario = await response.json();
            cargarDatosEnCampos(usuario);
        } else {
            // Manejar errores
            console.error('Error al obtener los datos del usuario para edición');
        }
    } catch (error) {
        console.error(error);
    }
};
