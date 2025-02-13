const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Equipment = sequelize.define('Equipment', {
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false }, // Экскаватор, грузовик и т. д.
    status: { type: DataTypes.STRING, defaultValue: 'working' }, // working, maintenance, broken
    lastMaintenance: { type: DataTypes.DATE, allowNull: true }, // Дата последнего техобслуживания
    sensorData: { type: DataTypes.JSON, allowNull: true } // Данные с датчиков
});

module.exports = Equipment;
