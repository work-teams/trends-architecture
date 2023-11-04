document.querySelector('#save-button').addEventListener('click', () => {
    const usuarioId = obtenerIdDelUsuario();
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    const usuario = new Usuario(usuarioId, firstname, lastname, email, phone);

    guardarOActualizarUsuario(usuario);
});

const guardarOActualizarUsuario = async (usuario) => {
    try {
        let method = 'POST';
        let url = '/api/users';
        if (usuario.id) {
            method = 'PUT';
            url += `/${usuario.id}`;
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        if (response.ok) {
            // Manejar la respuesta exitosa
            listarUsuarios();
            limpiarCamposDeEdicion();
        } else {
            // Manejar errores
            console.error('Error al guardar o actualizar el usuario');
        }
    } catch (error) {
        console.error(error);
    }
};

// Función para limpiar los campos de edición
const limpiarCamposDeEdicion = () => {
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone').value = '';
};
