const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email"
        }
    },

    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function () { 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", UserSchema);
module.exports = User;