import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from '../routes/user.routes.js';
import searchRouter from '../routes/search.routes.js';

import { SESSION_SECRET } from "../constants/env.js";
import { MONGODB_URI } from "../constants/env.js";

const expressApp = express();

const sess = {
    secret: SESSION_SECRET, 
    saveUninitialized: false,
    resave: true,
    cookie: {}
}

if (expressApp.get('env') === 'production') {
    expressApp.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
    sess.store = MongoStore.create({ mongoUrl: MONGODB_URI });
}

// Midleware
expressApp.use(express.json());
expressApp.use(session(sess));

// Routes
expressApp.use('/api/user', userRouter);
expressApp.use('/api/search', searchRouter);

export default expressApp;