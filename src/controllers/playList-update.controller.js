import PlayList from "../models/PlayList.js";
import Song from "../models/Song.js";
import { searchTrack } from "./common/searchTracks.js";

// DB AUX FUNCTIONS
const getSongs = (id) =>{
    return Song.find({ externalId: id });
}

const createSongs = (songs) => {
    return Song.create(songs); 
}

const findPlaylistSongs = (playlistId, songsId) => {
    return PlayList.find(
        {
            _id: playlistId,
            songs: { $in: songsId }
        }
    );
}

// WRAPPERS LOGIC FUNCTIONS
const getNewSongs = (songs, spotifyToken) => {

    return Promise.all(
        songs.map(async (songId) => {
            const songsSaved = await getSongs(songId);

            if(!songsSaved.length){
                const songFound = await searchTrack(spotifyToken, songId);
                if(songFound?.error){
                    return songFound.error;
                }

                const newSong = await createSongs(songFound?.song?.song);
                // console.log(newSong);
                return newSong;
            }

            return songsSaved[0];
        })
    )
}

const isSongsInPlaylist = async (playlistId, songsId) => {
    const playlists = await findPlaylistSongs(playlistId, songsId);
    if(!playlists.length) return Promise.resolve(false)

    return Promise.resolve(true);
}

// AUX FUNCTIONS 
const extractSongId = (songs) => {
    return songs.map(newSong => newSong._id);
}

export const updatePlayList = async (req, res) => {
    
    const { id } = req?.params;
    // console.log(id);

    const playlist = await PlayList.findById(id).exec();
    // console.log(playlist);

    if(!playlist){
        return res
            .json({
                succes: false,
                error: {
                    code: 111,
                    message: "Play list not found"
                }
            })
    }

    const { name, songs, isPublic } = req?.body;

    if(name){
        playlist.name = name;
    }

    if(typeof(isPublic) !== 'undefined'){
        playlist.isPublic = isPublic;
    }

    if (songs){
        // Validar si las canciones existen
        const newSongs = await getNewSongs(songs, req.session?.spotifyToken);
        
        const newSongsIds = extractSongId(newSongs); // id del model Song
        // console.log(newSongsIds);

        // // validar si las canciones ya están en la play list
        const isSongs = await isSongsInPlaylist(id, newSongsIds);
    
        // console.log(isSongs);
        if (isSongs){
            const songNames = newSongs.map(newSong => newSong.name).join(", ")
            return res
                .status(400)
                .json({
                    succes: false,
                    message: `This songs: ${songNames}. Already exist in play list ${id}`
                })
        }
    
        newSongsIds.forEach(songId => {
            playlist.songs.push(songId)
        });
    }

    playlist.save();
    console.log(playlist);
    res.json({
        succes: true,
        data: {
            playlistId: playlist._id
        },
        message: `Play list update succesfully!`
    })

    // const { name, songs, isPublic } = req?.body;
    // // console.log(isPublic);
    
    // if (name && !songs.length){
    //     console.log("CAMBIAR SOLO EL NOMBRE");
    //     const playList = await PlayList.findOneAndUpdate(
    //         { _id: id },
    //         { name },
    //         { new: true } 
    //     );

    //     res.json({
    //         succes: true,
    //         data: {
    //             playListId: playList._id
    //         },
    //         message: ` Play list update succesfully!`
    //     });

    // }
    
    // if (songs.length && !name){
    //     console.log("CAMBIAR SOLO CANCIONES");
    //     // Validar si las canciones existen
    //     const newSongs = await Promise.all(songs.map(async (songId) => {
    //         console.log(`song ${songId}`)
        
    //         const songSaved = await Song.find({ externalId: songId });
    //         if (!songSaved.length){
    //             console.log(`buscando cancion ${songId}`);
    //             const songFound = await getSong(req.session?.spotifyToken, songId);
    //             if (songFound?.error) {
    //                 return res
    //                     .status(500)
    //                     .json({
    //                         succes: false,
    //                         error: {
    //                             code: 110,
    //                             message: "Some faild in request to spotify Api"
    //                         }
    //                     })
    //             }
    //             // console.log(songFound?.error);
    //             // console.log(songFound?.song?.song);
    //             const newSong = await Song.create(songFound?.song?.song);
    //             return newSong;
    //         }
    //         // console.log(songSaved[0]._id);
    //         return songSaved[0];
    //     }));
        
    //     const newSongsIds = newSongs.map(newSong => newSong._id); // id del model Song
    //     console.log(newSongsIds);

    //     // validar si las canciones ya están en la play list
    //     const playListExisted = await PlayList.find(
    //         {
    //             _id: id,
    //             songs: { $in: newSongsIds }
    //         }
    //     );
    
    //     console.log(playListExisted);
    //     if (playListExisted.length){
    //         const songNames = newSongs.map(newSong => newSong.name).join(", ")
    //         return res
    //             .status(400)
    //             .json({
    //                 succes: false,
    //                 message: `This songs ${songNames} already exist in play list ${id}`
    //             })
    //     }

    //     // { $push: { songs: { $each: newSongsIds }}},// queryUpdate
    //     const playList = await PlayList.findOneAndUpdate(
    //         { _id: id }, // filter
    //         { $push: { songs: { $each: newSongsIds }}},//update
    //         { new: true } 
    //     );
        
    //     console.log(playList);
    //     res.json({
    //         succes: true,
    //         data: {
    //             playListId: playList._id
    //         },
    //         message: `Play list update succesfully!`
    //     });
    // }

    // if (typeof(isPublic) !== 'undefined' && !name && !songs.length){
    //     console.log("CAMBIAR SOLO IS PUBLIC");
    //     const playList = await PlayList.findOneAndUpdate(
    //         { _id: id },
    //         { isPublic },
    //         { new: true } 
    //     );

    //     res.json({
    //         succes: true,
    //         data: {
    //             playListId: playList._id
    //         },
    //         message: ` Play list update succesfully!`
    //     });

    // }
}