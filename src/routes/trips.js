const express = require("express")
const router = express.Router()
const { finishTrip } = require("../service/validatorBack")
const validate = require("../middlewares/validate")
const tripControllers = require("../controllers/tripController")

router.post("/:id", finishTrip, validate, tripControllers.completeTrip)
router.get("/:id", tripControllers.getOnlyTrip)
router.get("/", tripControllers.getAllTrip)


module.exports = router;