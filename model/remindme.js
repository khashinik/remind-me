var moment = require('moment');

module.exports = function (sequelize, DataTypes){
    var userTable = sequelize.define("remind_me", {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            allowNull: false,
        }
    });

    var messageTable = sequelize.define('remind_me',{

        deliveryDate:{
            type: DataTypes.DATEONLY,
            get: function(){
                return moment.utc(this.getDataValue('deliveryDate')).format('YYYY-MM-DD');
            }
        },

        deliveryTime:{
            get: function(){
                let time = this.getDataValue('deliveryTime')
                if (moment(time,moment.ISO_8601, true).isValid()){
                    return moment(this.getDataValue('deliveryTime')).format("hh:mm:ss a")
                } else {
                    return time
                }
            }
        },

        //1 stands for phone
        //2 stands for email
        //3 stands for both
        deliveryMethod: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        message: {
            type: DataTypes.TEXT,
            defaultValue: "Just a friendly reminder :)"
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            }   
        }
    })
};