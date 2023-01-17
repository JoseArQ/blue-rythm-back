import Joi from "joi";

const playlistSchema = Joi.object({
    name: Joi.string().min(5).required(),
    isPublic: Joi.boolean(),
    songs: Joi.array().items(Joi.string())
});

export default playlistSchema;