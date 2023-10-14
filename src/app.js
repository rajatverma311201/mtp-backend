const express = require('express');
const axios = require('axios');
const userRouter = require('./routes/userRoutes');
const xirrRouter = require('./routes/xirrRoutes');
const authRouter = require('./routes/authRoutes');
const stockRouter = require('./routes/stockRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const schedule = require('node-schedule');

// const job = schedule.scheduleJob('0 * * *', async function () {

// });

app.use(
  cors({
    origin:
      process.env.NODE_ENV == 'development'
        ? '*'
        : 'https://mtp-frontend.vercel.app',
  })
);

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/me`;
  console.log(url);
  res.send('Hello World');
});

app.use('/api/users', userRouter);
app.use('/api/xirrs', xirrRouter);
app.use('/api/auth', authRouter);
app.use('/api/stocks', stockRouter);

module.exports = app;
