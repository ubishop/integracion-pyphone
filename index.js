const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "SgnTp2kD06dbUJdwQFd0A"; // 🔹 Reemplaza con tu API Key de PayPhone
const SECRET_KEY = "xVf3ogkgUkW5w8OKQ6sGQ"; // 🔹 Reemplaza con tu Secret Key de PayPhone

// Endpoint para generar un pago en PayPhone
app.post("/pagar", async (req, res) => {
  try {
    const { amount, currency, phone, order_id, return_url } = req.body;

    const response = await axios.post(
      "https://pay.payphonetodoesposible.com/api/button/Prepare",
      {
        amount: amount * 100, // 🔹 PayPhone trabaja con valores en centavos
        currency: currency,
        phoneNumber: phone || "",
        email: "cliente@correo.com", // Reemplaza con el correo del cliente si es necesario
        reference: order_id,
        responseUrl: return_url,
        cancellationUrl: return_url,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.payWithCard) {
      res.json({ payment_url: response.data.payWithCard });
    } else {
      res.status(400).json({ error: "No se pudo generar el pago" });
    }
  } catch (error) {
    console.error("Error generando el pago:", error.response?.data || error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
