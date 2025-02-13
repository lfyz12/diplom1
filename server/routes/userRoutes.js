const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Получение списка всех пользователей (только для админов)
router.get('/', authMiddleware(['admin']), async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: 'Ошибка получения пользователей' });
    }
});

// Получение информации о своем профиле
router.get('/me', authMiddleware(), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: 'Ошибка получения данных' });
    }
});

// Изменение роли пользователя (только для админов)
router.put('/:id/role', authMiddleware(['admin']), async (req, res) => {
    try {
        const { role } = req.body;
        await User.update({ role }, { where: { id: req.params.id } });
        res.json({ message: 'Роль обновлена' });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка обновления роли' });
    }
});

module.exports = router;
