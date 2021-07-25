
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//Kullanıcı girişi
const auth = async (req, res, next) => {

    
    try {
        if(req.header("Authorization")){
            const token = req.header("Authorization").replace("Bearer ", "")
            const sonuc = jwt.verify(token, "secretkey")
    
            console.log(await User.findById({ _id: sonuc._id }))
    
            const user = await User.findById({ _id: sonuc._id })
    
            if(user){
                req.user = user
            } else {
                throw new Error("Lütfen giriş yapın")
            }
    
            next()

        } else {
            throw new Error("Lütfen giriş yapın")
        }


    } catch (error) {
        next(error)
    }
}

module.exports = auth