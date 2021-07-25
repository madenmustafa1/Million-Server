

const admin = (req, res, next) => {

    if(req.user && !req.user.isAdmin){
        return res.status(403).json({
            message: "Bu alan için yetkiniz yok."
        })
    } else {
        next()
    }


}

module.exports = admin