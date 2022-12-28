import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4(),
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
    }
}, { _id: false });

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign(
        {
            _id: this._id, 
            name: this.name,
            surname: this.surname,
            email: this.email,
        }, 
        process.env.JWT_PRIVATE_KEY
        );
    return token;
}
const User = model('User', userSchema);

export default User;