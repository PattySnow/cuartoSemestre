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


// CREAR RESERVA (POST) 
app.post("/api/create", (req, res) => {
    (async () => {
        try {
            // Verifica si el usuario está autenticado y obtén su ID
            const user = req.user; // Asumiendo que has configurado middleware para pasar la información del usuario en las solicitudes

            if (!user) {
                return res.status(401).send({ status: 'Failed', msg: 'Usuario no autenticado' });
            }

            await db.collection('reservas').doc().create({
                patente: req.body.patente,
                marca: req.body.marca,
                modelo: req.body.modelo,
                anio: req.body.anio,
                kilometraje: req.body.kilometraje,
                fecha: req.body.fecha,
                hora: req.body.hora,
                uidUsuario: user.uid
            });

            return res.status(200).send({ status: 'Success', msg: 'Reserva registrada' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});


// OBTENER RESERVA POR ID (GET)

app.get('/api/get/:id', (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection('reservas').doc(req.params.id);
            let reservas = await reqDoc.get();
            let response = reservas.data();

            return res.status(200).send({ status: 'Success', data: response });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});

// OBTENER TODAS LAS RESERVAS
app.get('/api/getAll', (req, res) => {
    (async () => {
        try {
            const query = db.collection('reservas');
            let response = [];

            await query.get().then((data) => {
                let docs = data.docs;
                docs.map((doc) => {
                    const selectedItem= {
                        id: doc.id, 
                        patente: doc.data().patente,
                        marca: doc.data().marca,
                        modelo: doc.data().modelo,
                        anio: doc.data().anio,
                        kilometraje: doc.data().kilometraje,
                        fecha: doc.data().fecha,
                        hora: doc.data().hora,
                        //uidUsuario: doc.data().uidUsuario
                    };
                   response.push(selectedItem); 
                });
                return response;
            });
            return res.status(200).send({ status: 'Success', data: response });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});



// ACTUALIZAR RESERVA  (PUT)
app.put("/api/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection('reservas').doc(req.params.id);
            await reqDoc.update({
              
                fecha: req.body.fecha,
                hora: req.body.hora
            });

            return res.status(200).send({ status: 'Success', msg: 'reserva actualizada' });
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

            return res.status(200).send({ status: 'Success', msg: 'reserva cancelada' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'Failed', msg: error });
        }
    })();
});


exports.app = functions.https.onRequest(app);