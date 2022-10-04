const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

let initial_path = path.join(__dirname, 'public');

let app = express();
app.use(express.static(initial_path));

app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, 'index.html'));
});

app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running...');
});
