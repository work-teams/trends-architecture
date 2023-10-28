const listarUsuarios = async () => {
  try {
    const response = await fetch('/api/users');
    if (response.ok) {
      const usuarios = await response.json();
      mostrarUsuariosEnVista(usuarios);
    } else {
      // Manejar errores
      console.error('Error al obtener la lista de usuarios');
    }
  } catch (error) {
    console.error(error);
  }
};

// Función para mostrar los usuarios en la vista
const mostrarUsuariosEnVista = (usuarios) => {
  const userList = document.getElementById('user-list');

  // Limpia la lista actual antes de agregar los nuevos elementos
  userList.innerHTML = '';

  // Recorre la lista de usuarios y crea elementos para mostrarlos en la vista
  usuarios.forEach((usuario) => {
    const userItem = document.createElement('li');
    userItem.textContent = `${usuario.firstname} ${usuario.lastname} - ${usuario.email}`;

    // Agrega el elemento a la lista
    userList.appendChild(userItem);
  });
};

listarUsuarios();
