import {connect} from 'mongoose';

// const MONGODB_URI = 'mongodb://localhost:27017/blue-rythm';

const connectDB = async (url) => {
    try {
        const db = await connect(url);
        console.log('DB connected to ', db.connection.name); 
    } catch (error) {
        console.log(error);
    }
    
}

export default connectDB;