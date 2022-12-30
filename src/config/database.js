import mongoose from 'mongoose';


mongoose.set('strictQuery', true);

const connectDB = async (url) => {
    try {
        const db = await mongoose.connect(url);
        console.log('DB connected to ', db.connection.name); 
    } catch (error) {
        console.log(error);
    }
    
}

export default connectDB;