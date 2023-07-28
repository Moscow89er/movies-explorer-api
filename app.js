const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = require('./config/config');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/moviesexplorerdb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
