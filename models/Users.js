var moment = require('moment');

module.exports = function (sequelize, DataTypes){
    var Users = sequelize.define("Users", {
        userID: {
            type: DataTypes.STRING,
            primaryKey: true,
            isUnique: true,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            }            
        },
        userEmail: {
            type: DataTypes.STRING,
            isUnique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        userPhone: {
            type: DataTypes.STRING,
            isUnique: true,
            allowNull: true,
        },
        userPhoto: {
            type: DataTypes.STRING,
            allowNull: true,
            validedate: {
                isURL: true
            }
        }
    })
    return Users;
}