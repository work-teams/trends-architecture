import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const generateRandomHash = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const generateCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const generateCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

export const generateMensaje = () => {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const esPar = numeroAleatorio % 2 === 0;
    const mensaje = esPar ? 'Se validó correctamente' : 'Se validó incorrectamente';

    if (esPar) {
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 2500
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: mensaje
        });
    }

    return mensaje;
};