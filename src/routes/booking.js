const express = require("express");
const bookingControllers = require("../controllers/bookingController")
const { bookingConfirmation, bookingValidator }= require("../service/validatorBack")
const validate= require("../middlewares/validate")
const router = express.Router();

router.post("/", bookingValidator, validate, bookingControllers.bookingRide)
router.post("/:id",bookingConfirmation, validate, bookingControllers.initTrip)



module.exports = router;