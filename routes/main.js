const homeController = require("../controllers/home")
const signupController = require("../controllers/signup")
const express = require("express")

const router = express.Router()

router.get('/',homeController.home)
router.get('/signup',signupController.getSignup)
router.post("/signup",signupController.postSignup)
router.get('/login',signupController.getLogin)
router.post('/login',signupController.postLogin)
module.exports = router