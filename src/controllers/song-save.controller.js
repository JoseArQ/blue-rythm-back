import Song from "../models/Song.js";

const songSaveController = async (req, res)=>{    
    // body -> data: [{name, songId, artist, album, preview, trackHref, albumImages}...]
    if (!req?.body?.data) {
        return res
            .status(400)
            .json({
                succes: false, 
                error: {
                    code: 104, 
                    message: "Data whith songs list information is requires"
                }
            });
    }

    const songCreate = await Song.create(req.body.data);
    console.log(req.body.data);
    res.json(songCreate);
}

export default songSaveController;