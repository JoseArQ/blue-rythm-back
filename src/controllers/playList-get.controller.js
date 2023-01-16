import PlayList from '../models/PlayList.js';

const searchPlayList = (query) => {
    return PlayList
        .find(query)
        .populate("userId", "name surname")
        .populate("songs", "name artist preview albumImage")
        .exec();
}

export const getPlayListController = async (req, res) => {
    const { user } = req;
        
    const playLists = await searchPlayList({ userId: user._id });
    if(!playLists.length){
        return res
            .status(404)
            .json({
                succes: false,
                error: {
                    code: 107,
                    message: "not found play list"
                }
            })
    }
    res.json(
        {
            succes: true,
            data: playLists,
            message: `${ playLists.length } play list found`  
        }
    )
}

export const getPlayListByIdController = async (req, res) => {
   
    const { id } = req?.params;
    
    const playLists = await searchPlayList({ 
        _id: id, 
        isPublic: true 
    });
    // console.log(playLists);
    if(!playLists.length){
        return res
            .status(404)
            .json({
                succes: false,
                error: {
                    code: 107,
                    message: "not found play list"
                }
            })
    }

    res.json(
        {
            succes: true,
            data: playLists,
            message: `play list found` 
        }
    )
}