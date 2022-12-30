import { hash } from "bcrypt";
import User from "../models/User.js";
import {SALT_ROUND} from "../constants/crypt.js";

const createUser = async (user) => {
    User.create(user);
}

const userRegisterController = async (req, res) => {

    const { name, surname, email, password, avatar } = req.body;

    const isEmailUserExist = await User.findOne({email});
    if (isEmailUserExist) return res.status(409).json({succes: false, message: "User email Already registered"});

    const hashedPasseword = await hash(password, SALT_ROUND);

    try {
        await createUser({
            _id: User.generateId(),
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
    } catch (error) {
        console.log(error);
        res.json(
            {
                succes: false, 
                message: error
            }
        );   
    }
}

export default userRegisterController;