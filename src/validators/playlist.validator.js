import Joi from "joi";

const updatePlaylistSchema = Joi.object({
    name: Joi.string().min(5),
    isPublic: Joi.boolean(),
    songs: Joi.array().items(Joi.string().required())
});

export default updatePlaylistSchema;