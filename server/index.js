import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import workoutRoutes from './routes/workoutRoutes.js';
import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api', workoutRoutes);

app.get('/', (req, res) => {
    res.send("hello from dalle");
});

const startServer = async () => {
    console.log("hi" + process.env.MONGO_URL);
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('server has started on port 8080'));
    }
    catch (err) {
        console.log(err);
    }
};

startServer();

