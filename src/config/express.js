import express from 'express';
import session from 'express-session';
import userRouter from '../routes/user.routes.js';

const expressApp = express();

// Midleware
expressApp.use(express.json());
expressApp.use(session({
    secret: "secrete-key",
    saveUninitialized: false,
    resave: true
}));

// Routes
expressApp.use('/api/user', userRouter);

export default expressApp;