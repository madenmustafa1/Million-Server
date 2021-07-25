
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")
const createError = require("http-errors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minlegth: 3,
        maxlength: 50
    },
     userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    aboutMe: {
        type: String,
        default: "",
        maxlength: 1000
    },
    photoUrl: {
        type: String,
        default: "",
    },
    like: {
        type: String,
        default: "",
        maxlength: 1000
    },
    dislike: {
        type: String,
        default: "",
        maxlength: 1000
    },
    gender: {
        type: String,
        required: true,
        maxlength: 10
    },
    facebook: {
        type: String,
        maxlength: 50,
        default: ""
    },
    twitter: {
        type: String,
        maxlength: 50,
        default: ""
    },
    instagram: {
        type: String,
        maxlength: 50,
        default: ""
    },

}, { collection: "users", timestamps: true })


const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().min(5).trim(),
    aboutMe: Joi.string().max(1000),
    gender: Joi.string().max(10)

})


//Kullanıcı girişi için token
UserSchema.methods.generateToken = async function() {
    const user = this
    const token = await jwt.sign ({ _id: user.id }, "secretkey", { expiresIn: "10h"})

    return token
}


//Yeni user için
UserSchema.methods.joiValidation = function(userObject) {
    schema.required()

    return schema.validate(userObject)
}


UserSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user._id
    delete user.sifre
    delete user.createdAt
    delete user.updatedAt
    delete user.__v

    return user
}


UserSchema.statics.login = async (email, password) => {
    
    const {error, value} = schema.validate( {email, password })

    if(error) {
        throw createError(400, error)

    }

    const user = await User.findOne({ email: email })


    if(!user) {
        throw createError(400, "Girilen e-mail veya şifra hatalı.")
    }

    const passwordControl = await bcrypt.compare(sifre, user.sifre)

    if(!passwordControl){
        throw createError(400, "Girilen e-mail veya şifra hatalı.")
    }

    return user
}

//Update için
UserSchema.statics.joiValidationForUpdate = function(userObject) {
    return schema.validate(userObject)
}


const User = mongoose.model("User", UserSchema)

module.exports = User
