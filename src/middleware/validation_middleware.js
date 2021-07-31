const { body } = require("express-validator")


const validateNewUser = () =>{

    return[
        body("email").trim().isEmail().withMessage("Geçerli bir mail giriniz"),

        body("password").trim()
        .isLength({ min: 5 }).withMessage("password en az 6 karakter olmali")
        .isLength({ max: 30 }).withMessage("password en fazla 30 karakter olmali"),

        body("name").trim()
        .isLength({ min: 2 }).withMessage("name en az 2 karakter olmali")
        .isLength({ max: 50 }).withMessage("name en fazla 50 karakter olmali"),

        body("surname").trim()
        .isLength({ min: 2 }).withMessage("surname en az 2 karakter olmali")
        .isLength({ max: 50 }).withMessage("surname en fazla 50 karakter olmali"),

        body("username").trim()
        .isLength({ min: 3 }).withMessage("username en az 3 karakter olmali")
        .isLength({ max: 50 }).withMessage("username en fazla 50 karakter olmali"),


        body("gender").trim()
        .isLength({ max: 10 }).withMessage("gender en fazla 10 karakter olmali"),

        body("repassword").trim().custom((value, { req } ) => {
            if(value !== req.body.password){
                throw new Error("Sifreler aynı değil")
            }
            return true
        })
        
    ]
}

module.exports = {
    validateNewUser
}
