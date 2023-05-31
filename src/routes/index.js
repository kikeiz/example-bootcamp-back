const express = require("express");
const router = express.Router();
const validateToken = require('../middlewares/validateToken')
const app = express();


app.use("/user", require('./user'));
// app.use("/client", require('./clients'));


router.use("/scooters",validateToken, require("./scooters"));
router.use("/booking",validateToken, require("./booking"));
router.use("/trip",validateToken, require("./trips"));
router.post("/payment/:id",validateToken, require("../controllers/paymentController"))


router.get("/", (req, res) => {
    res.status(200).send("Thanks for login!");
});



module.exports = router;
