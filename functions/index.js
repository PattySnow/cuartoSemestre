const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tallermecanicoapp-27c7a.firebaseio.com"
});

const express = require("express");
const cors = require('cors')


const app = express();
app.use(cors({ origin: true }));

const db = admin.firestore();
const realTimeDb = admin.database();

// CREAR RESERVA (POST)
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      // Firestore
      const firestoreReservaRef = await db.collection('reservas').add({
        patente: req.body.patente,
        marca: req.body.marca,
        modelo: req.body.modelo,
        anio: req.body.anio,
        kilometraje: req.body.kilometraje,
        fecha: req.body.fecha,
        hora: req.body.hora
      });

      // Realtime Database
      const realtimeDbReservaRef = realTimeDb.ref('reservas').push({
        patente: req.body.patente,
        marca: req.body.marca,
        modelo: req.body.modelo,
        anio: req.body.anio,
        kilometraje: req.body.kilometraje,
        fecha: req.body.fecha,
        hora: req.body.hora
      });

      return res.status(200).send({
        status: 'Success',
        msg: 'Reserva registrada',
        firestoreReservaId: firestoreReservaRef.id,
        realtimeDbReservaKey: realtimeDbReservaRef.key
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 'Failed', msg: error });
    }
  })();
});

// OBTENER RESERVA POR ID (GET)
app.get('/api/get/:id', async (req, res) => {
  try {
    const doc = await db.collection('reservas').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send({ status: 'Failed', msg: 'Reserva no encontrada' });
    }

    const reserva = {
      id: doc.id,
      ...doc.data()
    };

    return res.status(200).send({ status: 'Success', data: reserva });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

// OBTENER TODAS LAS RESERVAS (Firestore)
app.get('/api/getAllFirestore', async (req, res) => {
  try {
    const querySnapshot = await db.collection('reservas').get();
    const reservas = [];
    querySnapshot.forEach((doc) => {
      reservas.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return res.status(200).send({ status: 'Success', data: reservas });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

// OBTENER TODAS LAS RESERVAS (Realtime Database)
app.get('/api/getAllRealtimeDb', (req, res) => {
  const reservasRef = realTimeDb.ref('reservas');
  reservasRef.once(
    'value',
    (snapshot) => {
      const reservas = snapshot.val();
      return res.status(200).send({ status: 'Success', data: reservas });
    },
    (errorObject) => {
      console.error('Error al obtener reservas en tiempo real: ', errorObject);
      return res
        .status(500)
        .send({ status: 'Failed', msg: 'Error al obtener reservas en tiempo real.' });
    }
  );
});

// ACTUALIZAR RESERVA  (PUT)
app.put("/api/update/:id", async (req, res) => {
  try {
    const reservaRef = db.collection('reservas').doc(req.params.id);
    const updateData = {
      fecha: req.body.fecha,
      hora: req.body.hora
    };

    // Actualizar en Firestore
    await reservaRef.update(updateData);

    // Actualizar en Realtime Database
    await realTimeDb.ref(`reservas/${req.params.id}`).update(updateData);

    return res.status(200).send({ status: 'Success', msg: 'Reserva actualizada' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

// DELETE 
app.delete("/api/delete/:id", async (req, res) => {
  try {
    const reservaRef = db.collection('reservas').doc(req.params.id);

    // Eliminar en Firestore
    await reservaRef.delete();

    // Eliminar en Realtime Database
    await realTimeDb.ref(`reservas/${req.params.id}`).remove();

    return res.status(200).send({ status: 'Success', msg: 'Reserva cancelada' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }


  
});



exports.app = functions.https.onRequest(app);
