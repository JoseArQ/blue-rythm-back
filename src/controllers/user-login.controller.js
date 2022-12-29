import { compare } from "bcrypt";
import User from "../models/User.js";

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(401).json({ succes: false, message: "Invalid credentials"});

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) return res.status(401).json({ succes: false, message: "Invalid credentials"});
    
    const jwt = await user.generateAuthToken();

    res.json({
        succes: true,
        token: jwt
    });
}

export default userLoginController;