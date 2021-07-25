const User = require("../models/userModel")
const createError = require("http-errors")
const bcrypt = require("bcrypt")

const allUserList = async (req, res, next) => {

    try {
        const allUsers = await User.find({})
        res.json( allUsers )

    } catch (error) {
        next(createError(400, error))
    }

}


const myProfile = (req, res, next) => {
    res.json(req.user)
}


//Kullanıcı profil güncelleme
const myProfileUpdate = async (req, res, next) => {
    delete req.body.createdAt
    delete req.body.updatedAt

    //Şifre varsa saklama
    if(req.body.hasOwnProperty("password")){
        req.body.password = await bcrypt.hash(req.body.password, 8)
    }

    const {error , value} = User.joiValidationForUpdate(req.body)


    if(error){
        next(createError(400, error))
    } else {

        try{
            const sonuc = await User.findByIdAndUpdate({_id: req.user.id}, 
                req.body, {new: true, runValidators: true})
    
            if(sonuc){
                return res.json(sonuc)
            } else {
                return res.status(404).json({
                    mesaj: "Kullanıcı bulunamadı"
                })
            }
        } catch(e){
    
            next(e)
        }
    }
}

//Kullanıcı profilini silme
const myProfileDelete = async (req, res, next) => {
    try{
        const sonuc = await User.findByIdAndDelete({ _id: req.user._id})
        if(sonuc){
            return res.json({
                message: "Kullanıcı silindi"
            })
        } else {
            throw createError(404, "Kullanıcı bulunamadı")
        }
    } catch(e){
        
        next(createError(400, e))
    }
}






//Adminin kullanıcı güncellemesi
const adminUserUpdate = async (req, res, next) => {

    delete req.body.createdAt
    delete req.body.updatedAt

    if(req.body.hasOwnProperty("password")){
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    const { error , value } = User.joiValidationForUpdate(req.body)

    if(error){
        next(createError(400, error))
    } else {

        try{
            const result = await User.findByIdAndUpdate({_id: req.params.id}, 
                req.body, {new: true, runValidators: true})
    
            if(result){
                return res.json(result)
            } else {
                return res.status(404).json({
                    message: "Kullanıcı bulunamadı"
                })
            }
        } catch(e){
            next(e)
        }
    }  
}

//Adminin bütün kullanıcı silmesi
const allUserDelete = async (req, res, next) => {

    try{
        const result = await User.deleteMany({isAdmin: false})
        if(result){
            return res.json({
                message: "Tüm kullanıcılar silindi"
            })
        } else {
            throw createError(404, "Kullanıcı bulunamadı")
        }
    } catch(e){ 
        next(createError(400, e))
    }
}

module.exports = {
    allUserList,
    myProfile,
    myProfileUpdate,
    adminUserUpdate,
    allUserDelete,
    myProfileDelete,
    allUserDelete
}
