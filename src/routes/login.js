const express = require("express");
const router = express.Router();
// const validateToken = require('../middlewares/validateToken') //se debería utilizar?

router.post("/", require('../controllers/loginController'));
router.get("/", require('../controllers/loginController'));

module.exports = router;
