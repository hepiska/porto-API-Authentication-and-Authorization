let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
let userSchema = new Schema({
    "email": {
        type: String,
        required: [true, 'please insert email'],
        unique: true,
        validate: {
            validator: function(mail) {
                return /[\d\w].+@[\d\w].+[.].+/.test(mail)
            },
            message: 'please input correct email'
        }
    },
    "name": String,
    "salt":String,
    "password": {
      type:String,
      min:[5,'password to shorts']
    }
})
userSchema.plugin(uniqueValidator)
var User = mongoose.model('User',userSchema);

module.exports=User
