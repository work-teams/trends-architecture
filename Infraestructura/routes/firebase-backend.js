const express = require("express");
const { db } = require("../firebase");
const router = express.Router();

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
  res.redirect("/");
}));

// Ruta para eliminar un usuario
router.get("/delete-user/:id", asyncHandler(async (req, res) => {
  await db.collection("admin").doc(req.params.id).delete();
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
  res.redirect("/");
}));

module.exports = router;
