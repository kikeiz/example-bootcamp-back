const express = require('express');
const router = express.Router();
const { getAllUser, getOnlyUser, updateUser} = require("../controllers/userController")
const registerUser  = require("../controllers/registerController")
const { userValidator } = require("../service/validatorBack");
const backValidation = require("../middlewares/validate");


router.get("/", getAllUser); 
router.get('/:id', getOnlyUser); 
router.post("/", userValidator, backValidation, registerUser);
router.patch('/:id', updateUser)

module.exports = router;