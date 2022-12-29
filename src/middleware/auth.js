import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../constants/env.js";

const auth = (req, res, next) => {
    const { authorization } = req.headers; 
    if (!authorization) return res.status(401).json({ succes: false, message: "Acces deneid. No token provided"})

    try {
        const decode = jwt.verify(authorization, JWT_PRIVATE_KEY);
        req.user = decode;
        next();

    } catch (error) {
        res.status(400).json({ succes: false, message: "Invalid Token"})
    }
}

export default auth;