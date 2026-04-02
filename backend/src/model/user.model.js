const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique:[true , 'username must be unique']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique:[true , 'email must be unique']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        // select:false
        
}
})

const userModel = mongoose.model("users", UserSchema);


module.exports = userModel

/*Task
 UserSchema.pre("save",function(next){})
 UserSchema.post("save",function(next){}) */