require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'src')));

// Servindo os arquivos
app.get('/', (req, res) => {
  res.send(path.join(__dirname + 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
