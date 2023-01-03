import Joi from "joi";

const songSchema = Joi.object({
    data: Joi
        .array()
        .items(Joi.object({
            name: Joi.string().required(),
            externalId: Joi.string().required(),
            artist: Joi.string(),
            album: Joi.string(),
            preview: Joi.string(),
            albumImage: Joi.string(),
        }))
        .required()
        .min(1)
});

export default songSchema;