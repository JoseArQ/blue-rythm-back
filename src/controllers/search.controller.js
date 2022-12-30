import  axios from 'axios';

const getApiQuery = (track, album, artists) => {
    let type;
    let search; // track or album
    let query;
    let error;

    if (!track && !album && !artists.length) {
        error = {
            code: 101, 
            message: "missing parameters tracks, album, artist are required."
        }
    }

    if (track) {// search only tracks
        type = "track";
        search = "track";
        query = track;

    }

    if (!track && album){// search only album
        type = "album";
        search = "album";
        query = album;
        
    }

    if (!track && !album && artists.length){// search only artist
        type = "artist";
        search = "artists";
        query = artists.join(',');
    }
    return {
        queryUrl: `type=${type}&q=${search}:${query}`,
        type,
        error
    }
}

const extractItems = (response, type) => {
    let data;
    if (type === "track"){
        data = response.data.tracks.items;
    }
    if (type === "album"){
        data = response.data.albums.items;
    }
    if (type === "artist"){
        data = response.data.artists.items;
    }
    return data;
}

const searchItems = async (url, token, type) => {
    try {
        let tracksItems = []
        const headers = {
            headers: {
                'Authorization': 'Bearer '+ token,
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json' 
            }
        }
        let resp = await axios.get(
            url,
            headers,
        );

        let items = extractItems(resp, type);
        if (resp.status === 200){
            tracksItems = tracksItems.concat(items);
        }  

        // while (resp.data.tracks.next){
        //     try {
        //         console.log("Next ", resp.data.tracks.next);
        //         resp = await axios.get(
        //             resp.data.tracks.next,
        //             headers
        //         );
                
                
        //         if (resp.status !== 200){
        //             console.log(resp);
        //             break;
        //         } 

        //         items = extractItems(resp, type);
        //         tracksItems = tracksItems.concat(items);
        //     } catch (ex) {
        //         console.log(ex);
        //         break;
        //     }
        // }
        // // console.log(tracksItems);
        return tracksItems;
    } catch (ex) {
        console.log(`Error searching tracks: ${ex}`);
    }
}

const extractInfo = (data, type) => {
    
    if (type === "track"){
        return data.map((track)=>{
            return {
                trackId: track.id,
                name: track.name,
                artist: track.artists[0].name,
                external_ref: track.external_urls.spotify,
                preview_url: track.preview_url
            }
        });
    }

    if (type === "artist"){
        return data.map((artist)=>{
            return {
                artistId: artist.id,
                name: artist.name,
                images: artist.images,
                external_ref: artist.external_urls.spotify
            }
        });
    }

    if (type === "album"){
        return data.map((album)=>{
            return {
                albumId: album.id,
                name: album.name,
                artist: album.artists[0].name,
                external_ref: album.external_urls.spotify,
                images: album.images
            }
        });
    }
}
const searchController = async (req, res) =>{

    const { track, album, artists } = req.body;

    const { queryUrl, type, error } = getApiQuery(track, album, artists);
    if (error) return res.status(400).json(error);

    const url = encodeURI(`https://api.spotify.com/v1/search?${queryUrl}`);
    // console.log(url);

    // console.log(queryUrl);
    const tracksResponse = await searchItems(
        url,
        req.session.spotifyToken,
        type
    );
    // console.log(tracksResponse);
    if (tracksResponse.length <= 1) return res.status(400).json({code: 102, message: "No Data."})
    
    const data = extractInfo(tracksResponse, type);
    // console.log(data);

    res.json({ 
        data,
        succes: true
    });
}

export default searchController;