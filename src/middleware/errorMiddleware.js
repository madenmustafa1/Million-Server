


const error = (err, req, res, next) => {
    //console.log(err)


    // if(err == "JsonWebTokenError: invalid token"){
    //     //console.log("aaaaa"+ err + "ERRROOOOOOOOOOOOooooooR")
    //     console.log("ASDASDASDASDASDASDASDASD")
    //     err.message = "Geçersiz token"
    //     err.status.code = 400
    // }


    if(err.code === 11000){
        
        return res.json({
            message: Object.keys(err.keyValue) + " için girdiğiniz " + Object.values(err.keyValue) 
             + " daha önceden kayıtlı olduğu için tekrar eklenemez / güncellenemez.",
            errorCode: 400
        })
    }

    if(err.code === 66) {
        return res.json({
            message: "Değiştirilemez bir alanı güncellemeye çalıştınız.",
            errorCode: 400
        })
    }

    res.status(err.status.code || 400)

    res.json({
        errorCode: err.statusCode || 400,
        message: err.message
    })


}

module.exports = error