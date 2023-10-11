const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');

const contenido = sequelize.define('contenido', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoriaID: { // Cambiado a "categoriaID" en lugar de "categoria"
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    generoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    resumen: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A",
    },
    temporadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    repartoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    trailer: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A',
    },
}, {
    tableName: 'contenido',
    timestamps: false,
});

module.exports = contenido;
