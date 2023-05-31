const { UserManager } = require('../models/users.js');

const createUser = async (req, res) => {
    try {
        const dataBaseRep = await UserManager.createUser(req.body); //coge informacion del body 
        if (dataBaseRep) {
            return res.status(201).json(dataBaseRep);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}


const getOnlyUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const dataBaseRep = await UserManager.getOnlyUser(id);
        if (dataBaseRep) {
            return res.status(200).json(dataBaseRep);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}


const getAllUser = async (req, res) => {
    try {
        const dataBaseRep = await UserManager.getAllUser();
        if (dataBaseRep) {
            return res.status(200).json(dataBaseRep);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}


const updateUser = async (req, res) => {
    const updateUser = {
        user_name: req.body.user_name,
        password: req.body.password,
        email: req.body.email,
        user_id: req.params.id,
    };
    try {
        const dataBaseRep = await UserManager.updateUser(updateUser);
        if (dataBaseRep) {
            return res.status(201).json(dataBaseRep);
        }
        return res.status(400).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
};

module.exports = { createUser, getOnlyUser, getAllUser, updateUser }

