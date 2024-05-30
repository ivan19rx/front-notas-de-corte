const Sequelize = require("sequelize");
const sequelize = new Sequelize('sistemaNotasDeCorte', 'avnadmin', 'AVNS_YHkqhTwYYQpj9MzxfAB', {
    host: 'sistema-notas-de-corte-sistema-notas-de-corte.e.aivencloud.com',
    dialect: 'mysql',
    port: 20893
});

sequelize
    .authenticate()
    .then(() => {
        console.log("conexao com banco de dados realizada");
    })
    .catch(() => {
        console.log("conexao com banco de dados não realizada");
    });

module.exports = sequelize;