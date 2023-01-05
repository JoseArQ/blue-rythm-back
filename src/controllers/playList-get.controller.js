import PlayList from '../models/PlayList.js';

const searchPlayList = (query) => {
    return PlayList.find(query);
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

export const getPlayListByNameController = async (req, res) => {
   
    const { name } = req?.params;
    // console.log(name);
    const playLists = await searchPlayList({ name });
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