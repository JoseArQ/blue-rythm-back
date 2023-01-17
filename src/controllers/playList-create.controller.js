import  axios from 'axios';

import Song from '../models/Song.js';
import PlayList from '../models/PlayList.js';

const formatSong = (song) => {
    return {
        name: song?.name,
        externalId: song?.id,
        artist: song?.artists[0]?.name,
        album: song?.album?.name,
        trackHref: song?.href,
        preview: song?.preview_url,
        albumImage: song?.album?.images[1]?.url,
    }
}

const getTracks = async (token, songId)=>{
    const response = await axios.get(
        "https://api.spotify.com/v1/tracks/" + songId,
        {
            headers: {
                'Authorization': 'Bearer '+ token,
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json' 
            }
        },
    );
    
    return formatSong(response.data);
}

const getSongs = (token, songs) => {
    let r;
    const result = songs.map(async (songId)=>{
        r = await getTracks(token,songId);
        // console.log(r);
        return r;
    });

    return result;
}

const getSongsId = async (songs) => {
    let s;
    const songIds = await Promise.all(songs.map(async (song) => {
        s = await Song.findOne({ externalId:song.externalId });
        if (!s) {
            s = await Song.create(song);
            return s._id;
        }
        return s._id;
        })
    );
    return songIds;
}
const playListController = async (req, res) => {
    // body -> name[string], songs[array] 
    const { user } = req;
    const { name, songs, isPublic } = req?.body;
    
    let newPlayList = {
        name: null,
        userId: user._id,
        songs: []
    };
    
    if(!name){
        return res
        .status(400)
        .json({
            succes: false,
            error: {
                code: 109,
                message: "name and songs parameter ara required"
            }
        })
    }

    // console.log(songs);
    let playlist = await PlayList.findOne({ 
        userId:user._id,
        name    
    });
    // console.log(playlist);
    
    if (playlist) {
        return res
            .status(400)
            .json({ 
                succes: false, 
                error: {
                    code: 106, 
                    message: `Play list '${name}' already exist`
                }
            });
    }
    
    newPlayList.name = name;
    
    if (songs){
        const songsFormated = await Promise.all(getSongs(req.session?.spotifyToken, songs));
        // console.log(songsFormated);
        
        const songsId = await getSongsId(songsFormated);
        // console.log(songsId);
        newPlayList.songs = songsId;
    }
    

    if (isPublic){
        newPlayList.isPublic = isPublic;
    }

    playlist = await PlayList.create(newPlayList);

    // console.log(playlist);
    
    res.json({
        succes: true,
        data: {
            playListId: playlist._id
        },
        message: "Play list created successfully"
    });
    // res.send('ok')
}

export default playListController;