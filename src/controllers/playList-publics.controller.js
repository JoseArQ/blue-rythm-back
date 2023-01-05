import PlayList from "../models/PlayList.js";

const getPublicPlayLists = () => {
    return PlayList
        .find({ isPublic: true })
        .populate("userId", "name surname")
        .populate("songs", "name artist preview")
        .exec()
}

export const getPublicPlayListController = async (req, res) => {
    const playLists = await getPublicPlayLists();

    if(!playLists.length){
        return res
            .status(404)
            .json({
                succes: false,
                error: {
                    code: 108,
                    message: "Not found public play list"
                }
            })
    }
    res.json({
        succes: true,
        data: playLists,
    })
}