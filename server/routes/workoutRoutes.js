import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// define the Workout schema
const workoutSchema = new mongoose.Schema({
    name: String,
    bestSet: String,
    date: String,
    sets: Array
}, {
    timestamps: true
});

// create the model from the schema
const Workout = mongoose.model('Workout', workoutSchema);

// define the routes

// get all workouts
router.get('/workouts', (req, res) => {
    Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(500).json('Error: ' + err));
});

// get one workout
router.get('/workouts/:id', (req, res) => {
    Workout.findById(req.params.id)
    .then(workout => res.json(workout))
    .catch(err => res.status(500).json('Error: ' + err));
});

// create a workout
router.post('/workouts', (req, res) => {
    const newWorkout = new Workout(req.body);
    newWorkout.save()
    .then(workout => res.json(workout))
    .catch(err => res.status(500).json('Error: ' + err));
});

// update a workout
router.put('/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Workout updated'))
    .catch(err => res.status(500).json('Error: ' + err));
});

// delete a workout
router.delete('/workouts/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
    .then(() => res.json('Workout deleted'))
    .catch(err => res.status(500).json('Error: ' + err));
});

export default router;
