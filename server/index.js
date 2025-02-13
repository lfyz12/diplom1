require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/equipment', equipmentRoutes);
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (e) {
        console.error('Ошибка подключения к БД:', e);
    }
};

start();