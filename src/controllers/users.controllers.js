const Users = require("../models/users.model")
const conexion = require("../database/mysql")
const { Op } = require("sequelize");
const Users_volunteers = require("../models/users_volunteers.model")


const user = {
    /**
     * Inserta en las bases de datos (MySQL) los datos del usuario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    register: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const { first_name, last_name, email, phone_number, birth_date, location, postal_code, interests, health_issues, car, comments, avatar } = req.body;
            const usr = await Users.create(con);
            const newUser = await usr.create({ first_name, last_name, email, phone_number, birth_date, location, postal_code, interests, health_issues, car, comments, strikes: 0, avatar });
            const data = newUser.dataValues
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false);
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Guarda la imagen de perfil en MySQL.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    setAvatar: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const usr = await Users.create(con);
            const setter = await usr.update({ avatar: req.body.avatar }, { where: { id: req.body.id } })
            res.json(setter)
        } catch (error) {
            res.send(error)
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Actualiza los datos del usuario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    update: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const { email, phone_number, location, posta_code, interests, health_issues, car, id } = req.body;
            const usr = await Users.create(con);
            const setter = await usr.update({ email, phone_number, location, posta_code, interests, health_issues, car }, { where: { id } });
            res.json(setter)
        } catch (error) {
            res.json(error);
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Aumenta en 1 los strikes del usuario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    increaseStrikes: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const usr = await Users.create(con);
            const userf = await usr.findByPk(req.params.id)
            const strikes = userf.dataValues.strikes
            const setter = await usr.update({ strikes: strikes + 1 }, { where: { id: req.params.id } });
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false);
        } finally {
            await conexion.cerrar(con);
        }
    },

    /**
     * Resetea a 0 los strikes del usuario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    resetStrikes: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const usr = await Users.create(con);
            const userf = await usr.findByPk(req.params.id)
            const strikes = userf.dataValues.strikes
            const setter = await usr.update({ strikes: 0 }, { where: { id: req.params.id } });
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false);
        } finally {
            await conexion.cerrar(con);
        }
    },


    /**
     * Responde con los datos guardados en MySQL filtrando por la ID.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getUserData: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const usr = await Users.create(con);
            res.json(await usr.findByPk(req.params.id))
        } catch (error) {
            res.send(error)
        } finally {
            await conexion.cerrar(con);
        }
    },
    getUsers: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const usr = await Users.create(con);
            res.json(await usr.findAll({
                order: [
                    ['strikes', 'DESC'],
                    ['last_contact', 'ASC']
                ]
            }))
        } catch (error) {
            res.send(error)
        } finally {
            await conexion.cerrar(con);
        }
    },
    getUsersByName: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const usr = await Users.create(con);
            res.json(await usr.findAll({
                where: {
                    [Op.or]: [
                        { first_name: { [Op.like]: `%${req.params.input}%` } },
                        { last_name: { [Op.like]: `%${req.params.input}%` } }
                    ]
                }
            }))
        } catch (error) {
            res.send(error)
        } finally {
            await conexion.cerrar(con);
        }
    },

}

module.exports = user