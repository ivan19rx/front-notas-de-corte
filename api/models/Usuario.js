const Sequelize = require('sequelize')
const db = require('./db')

const Usuario = db.define("usuarios", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nivelacesso: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//           
// Usuario.sync();
// Usuario.sync({ alter: true })

module.exports = Usuario