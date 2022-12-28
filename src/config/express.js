import express from 'express';
import userRouter from '../routes/user.routes.js';

const expressApp = express();

// Midleware
expressApp.use(express.json());

// Routes
expressApp.use('/api/user', userRouter);

export default expressApp;