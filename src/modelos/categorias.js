const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');

const categorias = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categorias',
    timestamps: false,
});

module.exports = categorias;