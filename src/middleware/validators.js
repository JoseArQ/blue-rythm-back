import Joi from "joi";
import Validators from "../validators/index.js";

const validate = function(validator){
    // const { register } = Validators;
    // console.log("VALIDATORS");
    // console.log(Validators);
    // console.log(register);
    if (!Validators.hasOwnProperty(validator)){
        throw new Error(`'${validator}' validator is not exist`);
    }

    return async function(req, res, next){
        try {
            const validated = await Validators[validator].validateAsync(req.body);
            req.body = validated;
            next();
        } catch (error) {
            if(error.isJoi) return res.status(422).json({message: error.message});
        }
    }
}

export default validate;