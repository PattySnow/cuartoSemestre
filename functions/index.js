const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require("express");
const cors = require ("cors");

// APP

const app = express();
app.use(cors({ origin: true }));

// DATABASE REFERENCE

const db = admin.firestore();

// ROUTES
app.get('/', (req, res) => {
    return res.status(200).send("Todo bien!!");
});

// POST

app.post("/api/create", (req, res) => {
 (async () => {
    try {
        
        await db.collection('reservas').doc().create({
          patente: req.body.patente,
          marca: req.body.marca,
          modelo: req.body.modelo,
          anio: req.body.anio,
          kilometraje: req.body.kilometraje,
          fecha: req.body.fecha,
          hora: req.body.hora
        });

        return res.status(200).send({status: 'Sucess', msg: 'reserva registrada'});
    } catch (error) {
        console.log(error)
        return res.status(500).send({status: 'Failed', msg: error});
    }
 })();
});

// GET

// PUT

// DELETE 

exports.app = functions.https.onRequest(app);