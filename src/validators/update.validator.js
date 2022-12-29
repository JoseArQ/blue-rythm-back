import Joi from "joi";

const updateSchema = Joi.object({
    name: Joi.string().min(5).max(20),
    surname: Joi.string().min(5).max(50),
    avatar: Joi.string().valid('avatar1', 'avatar2', 'avatar3')
});

export default updateSchema;