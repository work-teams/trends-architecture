const { db } = require('../firebase');
const db2 = require('../mysql');
const { Router } = require('express');
const router = Router();

// Consulta un contacto en Firebase por ID
const getFirebaseContact = async (id) => {
  const doc = await db.collection('admin').doc(id).get();
  return doc;
}

// Elimina un contacto en MySQL por teléfono
const deleteContactInMySQL = (phone, callback) => {
  const deleteQuery = 'DELETE FROM admin WHERE phone = ?';
  db2.query(deleteQuery, [phone], callback);
}

// Obtiene un contacto en MySQL por teléfono
const getContactInMySQL = (phone, callback) => {
  const selectQuery = 'SELECT * FROM admin WHERE phone = ?';
  db2.query(selectQuery, [phone], callback);
}

// Operaciones CRUD en Firebase

router.get('/', async (req, res) => {
  try {
    const querySnapshot = await db.collection('admin').get();
    const contacts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.render('index', { contacts });
  } catch (error) {
    console.error(error);
  }
});

router.post('/new-contact', async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;

  // Operación en Firebase
  const firebaseDocRef = await db.collection('admin').add({
    firstname,
    lastname,
    email,
    phone,
  });

  // Operación en MySQL
  const insertQuery = 'INSERT INTO admin (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)';
  db2.query(insertQuery, [firstname, lastname, email, phone], (error, result) => {
    if (error) {
      console.error(error);
    }
    res.redirect('/');
  });
});

router.get('/delete-contact/:id', async (req, res) => {
  const firebaseDocId = req.params.id;

  // Operación en Firebase
  const doc = await getFirebaseContact(firebaseDocId);
  await db.collection('admin').doc(firebaseDocId).delete();

  // Operación en MySQL
  if (doc.exists) {
    const phone = doc.data().phone;
    deleteContactInMySQL(phone, (error, result) => {
      if (error) {
        console.error(error);
      }
      res.redirect('/');
    });
  } else {
    console.error('El documento de Firebase no existe.');
    res.redirect('/');
  }
});

router.get('/edit-contact/:id', async (req, res) => {
  const firebaseDocId = req.params.id;

  // Operación en Firebase
  const doc = await getFirebaseContact(firebaseDocId);

  // Operación en MySQL
  if (doc.exists) {
    const phone = doc.data().phone;
    getContactInMySQL(phone, (error, results) => {
      if (error) {
        console.error(error);
      }
      res.render('index', { contact: { id: firebaseDocId, ...doc.data() } });
    });
  } else {
    console.error('El documento de Firebase no existe.');
    res.redirect('/');
  }
});

router.post('/update-contact/:id', async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  const firebaseDocId = req.params.id;

  // Operación en Firebase
  await db.collection('admin').doc(firebaseDocId).update({ firstname, lastname, email, phone });

  // Operación en MySQL
  const updateQuery = 'UPDATE admin SET firstname = ?, lastname = ?, email = ? WHERE phone = ?';
  db2.query(updateQuery, [firstname, lastname, email, phone], (error, result) => {
    if (error) {
      console.error(error);
    }
    res.redirect('/');
  });
});

module.exports = router;
