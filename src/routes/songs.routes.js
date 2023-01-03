import {Router} from 'express';
import axios from 'axios';

// import { getToken, getGenres} from '../web-api-auth';
import tokenVerify from "../middleware/tokenVerify.js";

import songController from "../controllers/song.controller.js";
import songSaveController from '../controllers/song-save.controller.js';
import auth from '../middleware/auth.js';
import Validator from '../middleware/validators.js';

const songRouter = Router();

songRouter.get('/', tokenVerify, songController);

// songRouter.post('/save', Validator("song"), songSaveController);

export default songRouter;