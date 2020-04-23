require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/apiRouter.js')
const userRouter = require('./routes/userRouter.js')
const PORT = 3000;
//changes
// const socket = require('socket.io');
// const http = require('http');

//up Changes ^

app.use(express.json());

//MongoDB Connection
mongoose.connect(
  process.env.DB,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

mongoose.connection
  .once('open', () => console.log('Connection to DB succesful'))
  .on('error', err => console.log("Your error", err))

app.use('/api', apiRouter)
app.use('/user', userRouter)

//handling client side routing
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//serve static files
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


//global error handler 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { error: 'An error occurred' + err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

//changes
// const server = http.createServer(app);

// const io = socket(server);
// const getApiAndEmit = "TODO";

// io.on('connection', () => {
//   console.log('New Client Connection')
// });
// server.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`)
// })
//changes ^



// UNDO BELOW
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

