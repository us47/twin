const Sequelize = require("sequelize");

const sequelize = new Sequelize("twindemo", "root", 'Mycourse@47', { host: '127.0.0.1', dialect: "mysql", operatorsAliases: false });

module.export = sequelize;
global.sequelize = sequelize;