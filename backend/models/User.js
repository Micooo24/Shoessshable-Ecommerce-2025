const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: [30, 'Your name cannot exceed 30 characters'],
        default: 'DefaultUsername'
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    role:  {
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user'
    },  
    
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema);
