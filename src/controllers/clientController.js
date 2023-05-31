const { ClientManager } = require('../models/clients.js');



const getClients = async (req, res) => {
    const dataBaseRep = await ClientManager.getClients();
    res.status(200).json(dataBaseRep);
}

const getOnlyClient = async (req, res) => {
    const id = parseInt(req.params.id)
    const dataBaseRep = await ClientManager.getOnlyClient(id);
    res.status(200).json(dataBaseRep);
}

const registerClient = async (req, res) => {
    const dataBaseRep = await ClientManager.registerClient(req.body); 
    res.status(201).json(dataBaseRep);
}


module.exports = {getClients, getOnlyClient, registerClient}