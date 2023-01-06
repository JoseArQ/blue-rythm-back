import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from '../routes/user.routes.js';
import searchRouter from '../routes/search.routes.js';
import songsRouter from '../routes/songs.routes.js';
import playListRouter from '../routes/playList.routes.js';

import { SESSION_SECRET, MONGODB_URI } from "../constants/env.js";
import { MORGAN_FORMAT } from "../constants/morganSettings.js";

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
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(session(sess));
expressApp.use(morgan(MORGAN_FORMAT));

// Routes
expressApp.use('/api/user', userRouter);
expressApp.use('/api/search', searchRouter);
expressApp.use('/api/songs', songsRouter);
expressApp.use('/api/playList', playListRouter);

export default expressApp;