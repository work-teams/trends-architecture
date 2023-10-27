const mysql = require('mysql');

const db2 = mysql.createConnection({
    host: 'mysql-tendenciasarquitectura.alwaysdata.net',
    user: '333398_free',
    password: 'g1-tendencias-arquitectura',
    database: 'tendenciasarquitectura_relacional',
});

// Conectar a MySQL
db2.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

module.exports = db2;
