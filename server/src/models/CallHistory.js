const Sequelize = require("sequelize")

module.exports = sequelize.define("callhistory", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    time: Sequelize.DATE,
    name: Sequelize.STRING(35),
    from: Sequelize.STRING(20),
    to: Sequelize.STRING(20),
    duration: Sequelize.INTEGER,
    call: Sequelize.STRING(100),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},
    {
        tableName: 'callhistory'
    }
);