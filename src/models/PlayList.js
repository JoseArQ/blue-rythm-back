import mongoose from 'mongoose';

const playListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { 
        type: String,
        ref: "User"
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song"
        }
    ],
    isPublic: {
        type: Boolean,
        default: false
    }
});

const PlayList = mongoose.model("PlayList", playListSchema);

export default PlayList;