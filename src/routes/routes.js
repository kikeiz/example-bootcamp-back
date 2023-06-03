const router = require("express").Router();
const ticket = require("../controllers/tickets.controllers");
const user = require("../controllers/users.controllers");
const volunteer = require('../controllers/volunteers.controllers')
const events = require("../controllers/events.controllers")
const calls = require("../controllers/calls.controllers")
const reports = require("../controllers/reports.controllers")


//TEST
router.get("/", (req, res) => res.send('RECEIVED'))

//USER
router.post("/user-register", user.register)
router.post("/setAvatar", user.setAvatar)
router.post("/user-update", user.update)
router.get("/increaseStrike/:id", user.increaseStrikes)
router.get("/resetStrikes/:id", user.resetStrikes)
router.get("/getUser/:id", user.getUserData)
router.get("/getUsers", user.getUsers)
router.get("/getUsersByName/:input", user.getUsersByName)

//VOLUNTEER / TECNIC

router.post("/login", volunteer.login )
router.get("/volunteer/:id", volunteer.getvolunteerData)
router.post("/volunteer-register", volunteer.register)
router.get("/getLogged", volunteer.getLogged)

//TICKETS

router.post("/newTicket", ticket.insert)
router.get("/getTickets", ticket.getAll)

//REPORTS

router.post("/newReport", reports.insert )
router.get("/getReports", reports.getAll)

//EVENTS

router.post("/newEvent", events.create)
router.get("/getEvents", events.getEvents)
router.get("/getEvent/:id", events.getEventById)

//CALLS

router.post("/startCall", calls.startCall)
router.post("/finishCall", calls.finishCall)


module.exports = router;