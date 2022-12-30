import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from "../constants/env.js";


const getToken = async function(){
  try {
    const result = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({grant_type: 'client_credentials'}),
      {
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
          'content-type': 'application/x-www-form-urlencoded',
          'accept': 'application/json' 
        }
      }
    )
    return result.data.access_token;
  } catch (error) {
    console.log(error.code);
    console.log(error.data);
  }
}

const checkToken = async function(token){
  try {
    const result = await axios.get(
      'https://api.spotify.com/v1/browse/new-releases',
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'content-type': 'application/json',
        }
      }
    )
    return true;
  } catch (error) {
    // console.log(error.code);
    // console.log(error.response.data);
    return false;
  }
}
export{
  getToken,
  checkToken
} 