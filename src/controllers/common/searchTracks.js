import axios from "axios";

const getResponse = (track) => {
    try {
        return {

            song: {
                name: track?.name,
                externalId: track?.id,
                artist: track?.artists[0]?.name,
                album: track?.album?.name,
                preview: track?.preview_url,
                trackHref: track?.href,
                albumImage: track?.album?.images[1]?.url,
            },
            error: null
            }
        
    } catch (error) {
        return {
            song: null,
            error
        }
    }

}

export const searchTrack = async (token, songId) =>{
    try {
        const url = "https://api.spotify.com/v1/tracks/" + songId;
        console.log(url);
        console.log(token);
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

        return {
            song: getResponse(res?.data),
            error: null
        }

    } catch (error) {
        return {
            song: null,
            error: error?.data
        }
    }
}