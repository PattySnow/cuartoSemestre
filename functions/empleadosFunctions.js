const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tallermecanicoapp-27c7a.firebaseio.com"
  });

const app = express();
app.use(cors({ origin: true }));

const db = admin.firestore();

// Endpoint para crear un empleado
app.post('/empleados/createEmpleado', async (req, res) => {
  try {
    const empleadoData = req.body;
    const empleadoRef = await db.collection('empleados').add(empleadoData);
    return res.status(200).send({ status: 'Success', msg: 'Empleado creado', empleadoId: empleadoRef.id });
  } catch (error) {
    console.error('Error al crear empleado:', error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

// Endpoint para obtener todos los empleados
app.get('/empleados/getAllEmpleados', async (req, res) => {
  try {
    const querySnapshot = await db.collection('empleados').get();
    const empleados = [];
    querySnapshot.forEach((doc) => {
      empleados.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return res.status(200).send({ status: 'Success', data: empleados });
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

// Endpoint para obtener un empleado por ID
app.get('/empleados/getEmpleado/:id', async (req, res) => {
  try {
    const empleadoId = req.params.id;
    const empleadoDoc = await db.collection('empleados').doc(empleadoId).get();

    if (!empleadoDoc.exists) {
      return res.status(404).send({ status: 'Failed', msg: 'Empleado no encontrado' });
    }

    const empleadoData = empleadoDoc.data();
    return res.status(200).send({ status: 'Success', data: empleadoData });
  } catch (error) {
    console.error('Error al obtener empleado por ID:', error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

// Endpoint para actualizar un empleado
app.put('/empleados/updateEmpleado/:id', async (req, res) => {
  try {
    const empleadoId = req.params.id;
    const empleadoData = req.body;
    await db.collection('empleados').doc(empleadoId).update(empleadoData);
    return res.status(200).send({ status: 'Success', msg: 'Empleado actualizado' });
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

// Endpoint para eliminar un empleado
app.delete('/empleados/deleteEmpleado/:id', async (req, res) => {
  try {
    const empleadoId = req.params.id;
    await db.collection('empleados').doc(empleadoId).delete();
    return res.status(200).send({ status: 'Success', msg: 'Empleado eliminado' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
});

exports.empleados = functions.https.onRequest(app);
