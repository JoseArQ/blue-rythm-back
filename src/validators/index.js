import register from "./register.validator.js";
import update from "./update.validator.js";
import song from "./song.validator.js";
import updatePlaylist from "./playlist.validator.js";
import createPlaylist from "./playlist-create.validator.js";

const Validators = {
    register,
    update,
    song,
    updatePlaylist,
    createPlaylist
}

export default Validators;