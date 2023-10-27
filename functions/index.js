const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const express = require("express");
const cors = require("cors");

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

            return res.status(200).send({ status: 'Sucess', msg: 'reserva registrada' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});

// GET
// SINGLE DOCUMENT BY ID

app.get('/api/get/:id', (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection('reservas').doc(req.params.id);
            let reservas = await reqDoc.get();
            let response = reservas.data();

            return res.status(200).send({ status: 'Sucess', data: response });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});

// ALL DOCUMENTS FROM COLLECTION

app.get('/api/getAll', (req, res) => {
    (async () => {
        try {
            const query = db.collection('reservas');
            let response = [];

            await query.get().then((data) => {
                let docs = data.docs;

                docs.map((doc) => {
                    const selectedItem= {
                        patente: doc.data().patente,
                        marca: doc.data().marca,
                        modelo: doc.data().modelo,
                        anio: doc.data().anio,
                        kilometraje: doc.data().kilometraje,
                        fecha: doc.data().fecha,
                        hora: doc.data().hora
                    };

                   response.push(selectedItem); 
                });
                return response;
            });

            return res.status(200).send({ status: 'Sucess', data: response });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});


// UPDATE  (PUT)
app.put("/api/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection('reservas').doc(req.params.id);
            await reqDoc.update({
              
                fecha: req.body.fecha,
                hora: req.body.hora
            });

            return res.status(200).send({ status: 'Sucess', msg: 'reserva actualizada' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});

// DELETE 
app.delete("/api/delete/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection('reservas').doc(req.params.id);
            await reqDoc.delete();

            return res.status(200).send({ status: 'Sucess', msg: 'reserva cancelada' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});


exports.app = functions.https.onRequest(app);