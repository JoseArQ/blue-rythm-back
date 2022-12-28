import { Router } from "express";
import Validator from "../middleware/validators.js";
import userRegisterController from "../controllers/user-register.cotroller.js";

const router = Router();

router.post('/register', Validator('register'), userRegisterController);
// router.post('/login');
// router.patch('/update-data');
// router.patch('/update-email');
// router.patch('/update-password');
// router.delete('/unregister');

export default router;