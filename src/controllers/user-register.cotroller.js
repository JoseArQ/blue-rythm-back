import { hash } from "bcrypt";
import User from "../models/User.js";
import {SALT_ROUND} from "../constants/crypt.js";

const userRegisterController = async (req, res) => {

    const { name, surname, email, password, avatar } = req.body;

    const isEmailUserExist = await User.findOne({email});
    if (isEmailUserExist) return res.status(409).json({succes: false, message: "User email Already registered"});

    const hashedPasseword = await hash(password, SALT_ROUND);

    const user = await User.create({
        name,
        surname,
        email,
        password: hashedPasseword,
        avatar
    });

    res.json(
        {
            succes: true, 
            message: "User registered succesfully."
        }
    );   
}

export default userRegisterController;