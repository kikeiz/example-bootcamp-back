const express = require("express")
const router = express.Router()
const controllers = require("../controllers/scooterController")

router.get("/available/:geometry", controllers.scootersInZone)
//para que cuando reservemos una, se quite de las que se pueden seleccionar
router.post("/status/:id", controllers.availableScooterState)

module.exports = router;