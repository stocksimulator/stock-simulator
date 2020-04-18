const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()


const PORT = 3000;

/* --------------------------- Serve Static Assets -------------------------- */
// serve static files
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve entry point to app (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

console.log(process.env.API_KEY)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})