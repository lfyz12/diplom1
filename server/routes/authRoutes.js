const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hash });
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: 'Ошибка регистрации' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Неверные учетные данные' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка авторизации' });
    }
});

module.exports = router;
