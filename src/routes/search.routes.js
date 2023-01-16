import { Router } from 'express';

import auth from '../middleware/auth.js';
import tokenVerify from '../middleware/tokenVerify.js';
import searchController from "../controllers/search.controller.js";

const router = Router();

router.post('/', auth, tokenVerify, searchController);


export default router;
