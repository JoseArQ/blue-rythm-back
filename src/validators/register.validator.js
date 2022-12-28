import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    surname: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(255).required()
});

export default registerSchema;