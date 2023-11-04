import { insertarLogEntry } from '../backend/Infraestructura/rutas/insertarLogEntry';
import { obtenerLogEntries } from '../backend/Infraestructura/rutas/obtenerLogEntries';

document.getElementById("data-validation-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    await insertarLogEntry();
});


document.getElementById("volver-button").addEventListener("click", async function () {
    await obtenerLogEntries();
});
