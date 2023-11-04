const express = require("express");
const router = express.Router();
const { db2 }  = require("../DataBase/mysql");
const kafka = require("../broker/kafka-node");
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new Consumer(client, [{ topic: "user-events" }], { groupId: "mysql-consumer" });

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

consumer.on("message", async (message) => {
    const userEvent = JSON.parse(message.value);

    if (userEvent.action === "insert") {
        const { firstname, lastname, email, phone } = userEvent.data;
        const insertQuery = 'INSERT INTO admin (firstname, lastname, email, phone) VALUES (?, ?, ?, ?';

        try {
            const result = await queryDatabase(insertQuery, [firstname, lastname, email, phone]);
            console.log('Inserción exitosa en MySQL:', result);
        } catch (error) {
            console.error('Error al insertar en MySQL:', error);
        }
    } else if (userEvent.action === "update") {
        const { id, firstname, lastname, email, phone } = userEvent.data;
        const updateQuery = 'UPDATE admin SET firstname = ?, lastname = ?, email = ? WHERE phone = ?';

        try {
            const result = await queryDatabase(updateQuery, [firstname, lastname, email, phone]);
            console.log('Actualización exitosa en MySQL:', result);
        } catch (error) {
            console.error('Error al actualizar en MySQL:', error);
        }
    }
});

// Ruta para agregar un nuevo usuario en MySQL
router.post("/new-user", async (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    const insertQuery = 'INSERT INTO admin (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)';

    try {
        const result = await queryDatabase(insertQuery, [firstname, lastname, email, phone]);
        console.log('Inserción exitosa en MySQL:', result);
        res.redirect("/");
    } catch (error) {
        console.error('Error al insertar en MySQL:', error);
    }
});

// Elimina un usuario en MySQL
router.get('/delete-user/:phone', async (req, res) => {
    const phone = req.params.phone;
    const deleteQuery = 'DELETE FROM admin WHERE phone = ?';

    try {
        const result = await queryDatabase(deleteQuery, [phone]);
        console.log('Eliminación exitosa en MySQL:', result);
        res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar en MySQL:', error);
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
        console.error('Error al editar en MySQL:', error);
    }
});

// Actualiza un usuario en MySQL
router.post('/update-user/:phone', async (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    const updateQuery = 'UPDATE admin SET firstname = ?, lastname = ?, email = ? WHERE phone = ?';

    try {
        const result = await queryDatabase(updateQuery, [firstname, lastname, email, phone]);
        console.log('Actualización exitosa en MySQL:', result);
        res.redirect('/');
    } catch (error) {
        console.error('Error al actualizar en MySQL:', error);
    }
});

module.exports = router;
