import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';

import { JWT_PRIVATE_KEY } from '../constants/env.js';

const MINUTE = 60;
const expiredDate = (minute) => {
    return Math.floor(Date.now()/1000) + (60 * minute);
}

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    surname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
    },
    avatar: {
        type: String
    }
}, { _id: false });

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign(
        {
            _id: this._id, 
            name: this.name,
            surname: this.surname,
            email: this.email,
            avatar: this.avatar,
            exp: expiredDate(MINUTE)
        }, 
        JWT_PRIVATE_KEY
        );
    return token;
}

userSchema.statics.generateId = function (){
    return uuidv4();
}

const User = model('User', userSchema);

export default User;