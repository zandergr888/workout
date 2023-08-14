import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const router = express.Router();
// Define the User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Define the routes

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering new user: ' + err });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).json({ message: 'Logged in successfully' });
            console.log("it worked")
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
            console.log("invalid username or password");
        }
    } catch (err) {
        res.status(500).json({ error: 'Error logging in: ' + err });
    }
});

export default router;
