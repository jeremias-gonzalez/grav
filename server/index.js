require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Autenticación con Google Sheets usando variables de entorno
const client = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Conectar con Google Sheets
client.authorize(function (err, tokens) {
  if (err) {
    console.error('Error connecting to Google Sheets:', err);
    return;
  }
  console.log('Connected to Google Sheets');
});

// Ruta para obtener datos de Google Sheets
app.get('/api/sheet-data', async (req, res) => {
  const gsapi = google.sheets({ version: 'v4', auth: client });
  const options = {
    spreadsheetId: process.env.SPREADSHEET_ID, // Usar variable de entorno para el ID de la hoja
    range: 'Products!A2:E',
  };

  try {
    let data = await gsapi.spreadsheets.values.get(options);
    let rows = data.data.values;

    console.log('Data from Google Sheets:', data);

    if (!rows || rows.length === 0) {
      return res.status(404).send('No data found');
    }

    res.json(rows);
  } catch (err) {
    console.error('Error fetching data from Google Sheets:', err);
    res.status(500).json({
      message: 'Error fetching data from Google Sheets',
      error: err.message,
      stack: err.stack,
    });
  }
});
// Ruta para agregar un pedido
app.post('/api/add-order', async (req, res) => {
  const {
    customerName,
    customerSurname,
    customerDNI,
    customerTelefono,
    customerEmail,
    address: { street, number, piso, depto, city, province },
    cartItems,
    totalPrice // Incluye el totalPrice si deseas guardarlo
  } = req.body;

  // Agregar log para ver los datos recibidos
  console.log('Datos recibidos:', req.body);

  // Validar datos: pisos y deptos son opcionales
  if (!customerName || !customerSurname || !customerDNI || !customerTelefono || !customerEmail || !street || !number || !city || !province || !cartItems || cartItems.length === 0) {
    return res.status(400).send({ message: 'Faltan datos necesarios' });
  }

  const gsapi = google.sheets({ version: 'v4', auth: client });
  const options = {
    spreadsheetId: '1C81BRGg-U8eJLFXXGYIPEwdkOMwWbsWXIKcYVWz68gY', // Cambia por tu ID de hoja de cálculo
    range: 'pedidos!A2:G', // Cambia por tu rango deseado
    valueInputOption: 'RAW',
    resource: {
      values: [
        [customerName, customerSurname, customerDNI, customerTelefono, customerEmail, street, number, piso || '', depto || '', city, province, JSON.stringify(cartItems), totalPrice], // Usa '' si piso o depto son undefined
      ],
    },
  };

  try {
    console.log('Intentando agregar orden a Google Sheets...');
    await gsapi.spreadsheets.values.append(options);
    console.log('Orden agregada a Google Sheets exitosamente');
    res.status(201).send('Orden creada exitosamente');
  } catch (error) {
    console.error('Error al agregar la orden a Google Sheets:', error);
    res.status(500).send({
      message: 'Error interno del servidor',
      error: error.message || 'Error desconocido',
    });
  }
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
