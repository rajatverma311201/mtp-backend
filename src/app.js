const express = require('express');
const userRouter = require('./routes/userRoutes');
const xirrRouter = require('./routes/xirrRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/users', userRouter);
app.use('/api/xirrs', xirrRouter);

module.exports = app;
