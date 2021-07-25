const User = require("../models/userModel")
const createError = require("http-errors")
const bcrypt = require("bcrypt")

const login = async (req, res, next) => {
    try {
        const user = await User.login(req.body.email, req.body.sifre)
        
        const token = await user.generateToken()
        
        
        res.json({
            user: user,
            token: token
        })

    } catch(error) {
        next(error)
    }
}



//Kullanıcı oluştur
const newUserCreate = async (req, res, next) => {



    try{
        const user = new User(req.body)

        user.password = await bcrypt.hash(user.password, 8)

        const { error, value } = user.joiValidation(req.body)

        if(error) {
            next(createError(400, error))
        } else {
            const result = await user.save()

            res.json(result)
        }

    } catch(err){
        next(err)
    }

}


module.exports = {
    newUserCreate,
    login,
}
