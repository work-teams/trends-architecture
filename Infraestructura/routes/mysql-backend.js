const express = require('express');
const router = express.Router();
const db2 = require('../mysql');

// Función para realizar una consulta a la base de datos y retornar una promesa
const queryDatabase = (sql, params) => {
    return new Promise((resolve, reject) => {
        db2.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Inserta un nuevo usuario en MySQL
router.post('/new-user', async (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    const insertQuery = 'INSERT INTO admin (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)';
    try {
        await queryDatabase(insertQuery, [firstname, lastname, email, phone]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// Elimina un usuario en MySQL
router.get('/delete-user/:phone', async (req, res) => {
    const phone = req.params.phone;
    const deleteQuery = 'DELETE FROM admin WHERE phone = ?';
    try {
        await queryDatabase(deleteQuery, [phone]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// Edita un usuario en MySQL
router.get('/edit-user/:phone', async (req, res) => {
    const phone = req.params.phone;
    const selectQuery = 'SELECT * FROM admin WHERE phone = ?';
    try {
        const results = await queryDatabase(selectQuery, [phone]);
        res.render('index', { user: results[0] });
    } catch (error) {
        console.error(error);
    }
});

// Actualiza un usuario en MySQL
router.post('/update-user/:phone', async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const phone = req.params.phone;
    const updateQuery = 'UPDATE admin SET firstname = ?, lastname = ?, email = ? WHERE phone = ?';
    try {
        await queryDatabase(updateQuery, [firstname, lastname, email, phone]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
