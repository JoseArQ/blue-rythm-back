import { Router } from "express";
import Validator from "../middleware/validators.js";
import auth from "../middleware/auth.js";
import userRegisterController from "../controllers/user-register.cotroller.js";
import userLoginController from "../controllers/user-login.controller.js";
import userUpdateController from "../controllers/user-update.controller.js";
import userDeleteController from "../controllers/user-delete.controller.js";

const router = Router();

router.post('/register', Validator('register'), userRegisterController);
router.post('/login', userLoginController);
router.patch('/', auth, Validator('update'), userUpdateController);
router.delete('/', auth, userDeleteController);

export default router;