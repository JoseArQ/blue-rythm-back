import PlayList from "../models/PlayList.js";

export const playListRemoveController = async (req, res) =>{
    const { id } = req?.params;

    const result = await PlayList.deleteOne({_id: id});

    res.json({
        succes: true,
        message: `${result.deletedCount} Play list removed succesfully`
    });
}