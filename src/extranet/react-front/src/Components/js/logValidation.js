
const generateRandomHash = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
};

const generateCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const generateCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const generateMensaje = () => {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const esPar = numeroAleatorio % 2 === 0;
    return esPar ? 'Se validó correctamente' : 'Se validó incorrectamente';
};

const limpiarFormulario = () => {
    this.setState({
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dni: '',
        edad: '',
        fechaNacimiento: '',
    });
}

export {
    generateRandomHash,
    generateCurrentDate,
    generateCurrentTime,
    generateMensaje,
    limpiarFormulario,
};
