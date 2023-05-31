const express = require('express');
const router = express.Router();
const {getClients, getOnlyClient, registerClient} = require('../controllers/clientController')
 

router.get("/", getClients); 
router.get('/:id', getOnlyClient); 
router.post("/", registerClient);


module.exports = router;