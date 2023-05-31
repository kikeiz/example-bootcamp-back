const { body } = require("express-validator");

const userValidator = [
    body("password")
        .exists()
        .withMessage("Password must exist")
        .trim()
        .isLength({ min: 6 })
        .withMessage("El password debe contener al menos 5 caracteres"),
    body("email")
        .exists()
        .trim()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("insert a valid email"),
    body("user_name")
        .notEmpty()
        .isString()
        .blacklist("{}[]$")
        .trim()
        .escape()
        .withMessage("there is an error in your name"),
];

bookingValidator = [
    body("id_user")
        .exists().notEmpty().trim().isNumeric().blacklist("{}[]$").withMessage("insert a valid user"),
    body("id_scooter")
        .exists().notEmpty().trim().isNumeric().blacklist("{}[]$").withMessage("insert a valid scooter"),
]

bookingConfirmation = [
    body("lng")
        .exists().notEmpty().trim().isNumeric().blacklist("{}[]$").withMessage("insert a valid lng"),
    body("lat")
        .exists().notEmpty().trim().isNumeric().blacklist("{}[]$").withMessage("insert a valid lat"),
]

finishTrip = [
    body("time").exists().notEmpty().withMessage("there is a problem with your Date"),
    body("lng")
        .exists().notEmpty().trim().isNumeric().blacklist("{}[]$").withMessage("insert a valid lng"),
    body("lat")
        .exists().notEmpty().trim().isNumeric().blacklist("{}[]$").withMessage("insert a valid lat"),
]






module.exports = {
    userValidator,
    finishTrip,
    bookingConfirmation,
    bookingValidator
};