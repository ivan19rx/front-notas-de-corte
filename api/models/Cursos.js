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
    faculdade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notaDeCorte: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})

// Cursos.sync({ alter: true })

module.exports = Cursos