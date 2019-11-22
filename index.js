require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Servindo os arquivos
app.get('/', (req, res) => {
  res.send(path.join(__dirname + 'src/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on localhost:${port}`);
});
