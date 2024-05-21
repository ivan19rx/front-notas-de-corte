const Sequelize = require('sequelize')
const db = require('./db')

const Cursos = db.define('cursos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notaDeCorte: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

// Cursos.sync({ alter: true })

module.exports = Cursos