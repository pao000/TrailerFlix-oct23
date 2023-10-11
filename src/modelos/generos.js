const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');

const Genero = sequelize.define('generos', {
    generoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'generos',
    timestamps: false,
});

module.exports = Genero;
