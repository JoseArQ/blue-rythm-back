import axios from "axios";
import { getGenres } from "../services/spotify-api.js";

const generateSeed = async (token) => {
    const GENRES = await getGenres(token);
    if (GENRES?.error) return GENRES;

    const amountGenres = 4;

    let seed = new Set()
    for (let i = 0; i <= amountGenres; i++){
        seed.add(GENRES[Math.floor(Math.random() * GENRES.length)]);
    }
    seed = [...seed];
   
    return seed.join(',');
}

const getResponse = (tracks) => {
    try {
        const results = tracks.map((track) => {
        
            return {
                name: track?.name,
                externalId: track?.id,
                artist: track?.album?.artists[0]?.name,
                album: track?.album?.name,
                preview: track?.preview_url,
                trackHref: track?.href,
                albumImage: track?.album?.images[1]?.url,
            }
        });
        return {
            songs: results,
            error: null
        };
    } catch (error) {
        return {
            songs: null,
            error
        }
    }

}

const getSongs = async (token) =>{
    try {
        let genres = await generateSeed(token);
        if (genres?.error) return genres;

        let url = "https://api.spotify.com/v1/recommendations?limit=100&seed_genres=" + genres;
        const res = await axios.get(
            url,
            {
                headers: {
                    'Authorization': 'Bearer '+ token,
                    'content-type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json' 
                }
            },
        );
       
        const { songs, error } =  getResponse(res?.data?.tracks);
        if(error){
            return {
                songs: null,
                error
            }
        }

        return {
            songs,
            error: null
        }

    } catch (error) {
        return {
            songs: null,
            error: error?.data
        }
    }
}

const songController = async (req, res) => {
    
    const { songs, error } = await getSongs(req.session.spotifyToken);
    if (error){ 
        return res
            .status(500)
            .json({
                succes: false,
                error: {
                    code: 105, 
                    message: error.message + error.stack
                }});
    }

    res.json({
        succes: true, 
        data: songs
    });
}

export default songController;