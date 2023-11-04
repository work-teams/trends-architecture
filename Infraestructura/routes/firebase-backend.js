const express = require("express");
const { db } = require("../DataBase/firebase");
const router = express.Router();
const kafka = require("../broker/kafka-node");
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new Producer(client);

// Middleware para manejar errores
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Ruta para mostrar todos los usuarios
router.get("/", asyncHandler(async (req, res) => {
  const querySnapshot = await db.collection("admin").get();
  const usuarios = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.render("index", { usuarios });
}));

// Ruta para agregar un nuevo usuario
router.post("/new-user", asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  await db.collection("admin").add({
    firstname,
    lastname,
    email,
    phone,
  });

  // Enviar un evento a Kafka para indicar la inserción
  producer.send([
    {
      topic: "user-events",
      messages: JSON.stringify({
        action: "insert",
        data: { firstname, lastname, email, phone },
      }),
    },
  ]);

  res.redirect("/");
}));

// Ruta para eliminar un usuario
router.get("/delete-user/:id", asyncHandler(async (req, res) => {
  const doc = await db.collection("admin").doc(req.params.id).get();
  if (doc.exists) {
    await db.collection("admin").doc(req.params.id).delete();

    // Enviar un evento a Kafka para indicar la eliminación
    producer.send([
      {
        topic: "user-events",
        messages: JSON.stringify({
          action: "delete",
          data: { id: req.params.id },
        }),
      },
    ]);
  }

  res.redirect("/");
}));

// Ruta para mostrar la página de edición de un usuario
router.get("/edit-user/:id", asyncHandler(async (req, res) => {
  const doc = await db.collection("admin").doc(req.params.id).get();
  res.render("index", { user: { id: doc.id, ...doc.data() } });
  console.log('BANDERA ' + doc.data().email);
}));

// Ruta para actualizar un usuario
router.post("/update-user/:id", asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  const { id } = req.params;
  await db.collection("admin").doc(id).update({ firstname, lastname, email, phone });

  // Enviar un evento a Kafka para indicar la actualización
  producer.send([
    {
      topic: "user-events",
      messages: JSON.stringify({
        action: "update",
        data: { id, firstname, lastname, email, phone },
      }),
    },
  ]);

  res.redirect("/");
}));

module.exports = router;
