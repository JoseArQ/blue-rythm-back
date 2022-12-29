import { getToken, checkToken } from '../services/spotify-api.js';

const tokenVerify = async (req, res, next) => {
    // verificar si el token esta activo y generarlo según el caso
    if(!req.session.spotifyToken){
        req.session.spotifyToken = await getToken(); 
    }

    const isTokenEnabled = await checkToken("adsfe344");
    if(!isTokenEnabled){
        req.session.spotifyToken = await getToken();
    }

    next();
}

export default tokenVerify;