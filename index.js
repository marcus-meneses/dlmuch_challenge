'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const defaultRouter = require('./routes/default');
const port = process.env.NODE_ENVIRONMENT === 'production' ? 80 : 3000;

app.use(express.json());
app.use('/recipes', defaultRouter);

// the following if block is necessary for testing with tape
// you may remove if for deployment purposes
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server dlmuch-challenge online @ localhost:${port}`);
  });
} else {
  exports = module.exports = app;
}


