import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export function generateRandomHash() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function generateCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function generateCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

export function generateMensaje() {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const esPar = numeroAleatorio % 2 === 0;
    const mensaje = esPar ? 'Felicidades, puede continuar con su proceso' : 'Hubo problemas con su validación, intente nuevamente';

    Swal.fire({
        icon: esPar ? 'success' : 'error',
        title: esPar ? 'Validación exitosa' : 'Validación fallida',
        text: mensaje,
        showConfirmButton: false,
        timer: 5000
    });

    return mensaje;
}