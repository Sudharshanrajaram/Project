const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: 'User already exists' });

        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const match = await user.matchPassword(password);
        if (!match) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user._id, userName: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id, userName: user.username });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

module.exports = { registerUser, loginUser };
