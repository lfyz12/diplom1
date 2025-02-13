const express = require('express');
const Equipment = require('../models/Equipment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Получение списка всего оборудования
router.get('/', authMiddleware(), async (req, res) => {
    try {
        const equipment = await Equipment.findAll();
        res.json(equipment);
    } catch (e) {
        res.status(500).json({ error: 'Ошибка загрузки оборудования' });
    }
});

// Добавление нового оборудования (только админ)
router.post('/', authMiddleware(['admin']), async (req, res) => {
    try {
        const newEquipment = await Equipment.create(req.body);
        res.status(201).json(newEquipment);
    } catch (e) {
        res.status(500).json({ error: 'Ошибка создания оборудования' });
    }
});

// Обновление данных о конкретном оборудовании
router.put('/:id', authMiddleware(['admin', 'engineer']), async (req, res) => {
    try {
        await Equipment.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Оборудование обновлено' });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка обновления оборудования' });
    }
});

// Удаление оборудования (только админ)
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
    try {
        await Equipment.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Оборудование удалено' });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка удаления оборудования' });
    }
});

module.exports = router;
