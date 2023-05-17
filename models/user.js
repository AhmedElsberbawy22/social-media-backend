const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength:1024,
    },
    following: [String]
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
            {_id: this._id, userName: this.userName}, 
            process.env.JWT_SECRET_KEY,
            {expiresIn: 24 * 60 * 60});
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(10).max(1024).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;