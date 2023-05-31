
const startConnection = require("../config/connectiondb.js");
const tokenGenerator = require("../utils/tokenGenerator"); 
// const { UserManager } = require ("../models/users")
const {ClientManager} = require('../models/clients')

const client = startConnection();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    const dataBaseRep = await ClientManager.registerClient(req.body); 
    res.status(201).json(dataBaseRep);

}

module.exports = registerUser;
