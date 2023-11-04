const mysql = require('mysql');

const db2 = mysql.createConnection({
    host: 'tendenciasarquitectura.alwaysdata.net',
    user: '333398_free',
    password: 'g1-tendencias-arquitectura',
    database: 'tendenciasarquitectura_relacional',
});
w
// Conectar a MySQL
db2.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        throw err;
    }
    console.log('Conectado a MySQL');
});

module.exports = db2;
