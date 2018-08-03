
var moment = require('moment');

module.exports = function (sequelize, DataTypes){

var reminders = sequelize.define('reminders',{

    deliveryDate:{
        type: DataTypes.DATEONLY,
        get: function(){
            return moment.utc(this.getDataValue('deliveryDate')).format('YYYY-MM-DD');
        }
    },

    deliveryTime:{
        type: DataTypes.TIME,
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
return reminders;
}