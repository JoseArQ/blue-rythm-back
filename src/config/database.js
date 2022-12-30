import { connect } from 'mongoose';

const connectDB = async (url) => {
    try {
        const db = await connect(url);
        console.log('DB connected to ', db.connection.name); 
    } catch (error) {
        console.log(error);
    }
    
}

export default connectDB;