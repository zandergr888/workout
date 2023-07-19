import mongoose from 'mongoose';

const connectDB = (url) => {
    console.log("connecting" + url);
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err));
};

export default connectDB;
