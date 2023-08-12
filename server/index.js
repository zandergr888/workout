import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import workoutRoutes from './routes/workoutRoutes.js';
import connectDB from './mongodb/connect.js';
import loginRoutes from './routes/loginRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api', workoutRoutes);
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
    res.send("hello from dalle");
});

app.delete('/api/workouts/:id', async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
  
      if (!workout) {
        res.status(404).json({ message: "Workout not found" });
      } else {
        await workout.remove();
        res.json({ message: "Workout removed" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
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

