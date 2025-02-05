const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

const tokenRouter = require('./routes/tokenRouter');
const authRouter = require('./routes/authRouter');
const wishRouter = require('./routes/wishRouter');
const wishlistRouter = require('./routes/wishlistRouter');
const friendRouter = require('./routes/friendRouter');
const userRouter = require('./routes/userRouter');
const presentRouter = require('./routes/presentRouter');

app.use(cookieParser());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/wish', wishRouter);
app.use('/api/friend', friendRouter);
app.use('/api/users', userRouter);
app.use('/api/present', presentRouter);

module.exports = app;
