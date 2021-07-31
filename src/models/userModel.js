
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
        minlegth: 2,
        maxlength: 50
    },
    surname: {
        type: String,
        require: true,
        trim: true,
        minlegth: 2,
        maxlength: 50
    },
     username: {
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
        type: [],
        maxlength: 10000
    },
    dislike: {
        type: [],
        maxlength: 10000
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

    isActive: {
        type: Boolean,
        default: true,
        maxlength: 8
    },

    oneSignalID: {
        type: String,
        default: "",
        maxlength: 1000
    },
    newUserDate: {
        type: String,
        default: "Timestamp olacak",
        maxlength: 1000
    },

    newUserCount: {
        type: Number,
        default: 1,
        maxlength: 10
    },
    likeSize: {
        type: Number,
        default: 0,
        maxlength: 100000
    },
    dislikeSize: {
        type: Number,
        default: 0,
        maxlength: 100000
    },

    chatChannel: {
        type: [{}],
        maxlength: 100000
    },

    


}, { collection: "users", timestamps: true })


const schema = Joi.object({
    name: Joi.string().min(2).max(50).trim(),
    surname: Joi.string().min(2).max(50).trim(),
    username: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().min(5).trim(),
    repassword: Joi.string().min(5).trim(),
    aboutMe: Joi.string().max(1000),
    gender: Joi.string().max(10)

})



//Kullanıcı girişi için token
UserSchema.methods.generateToken = async function() {
    const user = this
    const token = await jwt.sign ({ _id: user.id }, "secretkey", { expiresIn: "10h"})

    return token
}

/*
//Yeni user için
UserSchema.methods.joiValidation = function(userObject) {
    schema.required()

    return schema.validate(userObject)
}
*/


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
    /*
    const {error, value} = schema.validate( {email, password })

    if(error) {
        throw createError(400, error)

    }
    */

    const user = await User.findOne({ email: email })


    if(!user) {
        throw createError(400, "Girilen e-mail veya şifra hatalı.")
    }

    const passwordControl = await bcrypt.compare(password, user.password)

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
