const router = require("express").Router()

const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController")

const validatorMiddleware = require("../middleware/validation_middleware")


//Giriş yapma 
router.post("/login", loginController.login)

//Yeni kullanıcı oluşturma 
router.post("/register", validatorMiddleware.validateNewUser(), loginController.newUserCreate)


// Oturum açan kullanıcı kendi bilgilerini listeler
router.get("/myprofile", authMiddleware, userController.myProfile)

//Oturum açan kullanıcının güncelleme işlemleri
router.patch("/myprofile", authMiddleware, userController.myProfileUpdate)

//Kullanıcının kendi verilerinin silmesi
router.delete("/myprofile", authMiddleware,  userController.myProfileDelete)






/*
//Tüm kullanıcıları admin listeleyebiliyor.
router.get("/", [authMiddleware, adminMiddleware], userController.tumUserlariListele)



//Adminin kullanıcıları güncellemesi
router.patch("/:id", userController.adminUserGuncelleme)


//Adminin tüm kullanıcıları silmesi
router.get("/deleteAll", [authMiddleware, adminMiddleware], userController.allUserDelete)

//Admin kullanıcı sileceği zaman kullanacağı rota
router.delete("/:id", [authMiddleware, adminMiddleware], userController.adminDeleteUser)
*/

module.exports = router