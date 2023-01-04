import mongoose from 'mongoose';

const Song = mongoose.model('Song', new mongoose.Schema({
    name: {type: String, required: true},
    externalId: {type: String, required: true},
    artist: {type: String},
    album: {type: String},
    trackHref: {type: String},
    preview: {type: String},
    albumImage:{type: String}
}));

export default Song;

