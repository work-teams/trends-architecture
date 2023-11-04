const crypto = require('crypto');

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 100);
}

function generarHashAleatorio() {
  return crypto.randomBytes(16).toString('hex');
}

function generarMensajeYHash() {
  const numeroAleatorio = generarNumeroAleatorio();
  const esPar = numeroAleatorio % 2 === 0;
  const mensaje = esPar ? 'Se valido correctamente' : 'Se valido incorrectamente';
  const hashAleatorio = generarHashAleatorio();

  return {
    // numero: numeroAleatorio,
    // mensaje: mensaje,
    hash: hashAleatorio
  };
}

// Uso de la función
const resultado = generarMensajeYHash();
// console.log('Número:', resultado.numero);
// console.log('Mensaje:', resultado.mensaje);
console.log('Hash:', resultado.hash);