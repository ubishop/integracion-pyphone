
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const API_KEY = "SgnTp2kD06dbUJdwQFd0A";  // Reemplaza con tu API Key de PayPhone
const SECRET_KEY = "xVf3ogkgUkW5w8OKQ6sGQ";  // Reemplaza con tu Secret Key de PayPhone


const port = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send('API funcionando correctamente 🚀');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});


app.post("/crear-pago", async (req, res) => {
    try {
        const { monto, telefono } = req.body;

        const response = await axios.post("https://pay.payphonetodoesposible.com/api/button/Prepare", {
            amount: monto * 100,
            currency: "USD",
            phoneNumber: telefono,
            email: "cliente@ejemplo.com",
            responseUrl: "https://tutienda.com/pago-exitoso",
            cancellationUrl: "https://tutienda.com/pago-cancelado",
        }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        res.json({ url: response.data.payWithPayPhone });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
