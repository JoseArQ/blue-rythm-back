import express from 'express';
import session from 'express-session';
import userRouter from '../routes/user.routes.js';
import searchRouter from '../routes/search.routes.js';

import { SESSION_SECRET } from "../constants/env.js";

const expressApp = express();

// Midleware
expressApp.use(express.json());
expressApp.use(session({
    secret: SESSION_SECRET, 
    saveUninitialized: false,
    resave: true
}));

// Routes
expressApp.use('/api/user', userRouter);
expressApp.use('/api/search', searchRouter);

export default expressApp;