// utils.js

function generateRandomHash() {
    // Implementa la generación de un hash aleatorio según tus necesidades
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function generateCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function generateCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function generateMensaje() {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const esPar = numeroAleatorio % 2 === 0;
    return esPar ? 'Se validó correctamente' : 'Se validó incorrectamente';
}

function limpiarFormulario() {
    const formulario = document.getElementById("data-validation-form");
    const campos = formulario.querySelectorAll("input");

    campos.forEach((campo) => {
        campo.value = "";
    });
}

export {
    generateRandomHash,
    generateCurrentDate,
    generateCurrentTime,
    generateMensaje,
    limpiarFormulario,
};
