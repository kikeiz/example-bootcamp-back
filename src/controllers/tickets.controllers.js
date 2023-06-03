const Tickets = require("../models/tickets.model")
const Users = require("../models/users.model")
const Volunteer = require("../models/volunteers.model")
const conexion = require("../database/mysql")
const { Op } = require("sequelize");


const ticket = {
    insert: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        const { fk_id_user, fk_id_volunteer, description_ } = req.body
        const date_ = new Date()
        try {
            const tkt = await Tickets.create(con);
            const newTkt = await tkt.create({ fk_id_user, fk_id_volunteer, description_, status_: "Pendiente", date_ })
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        } finally {
            await conexion.cerrar(con);
        }
    },
    getAll: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const tkt = await Tickets.create(con);
            res.json( await tkt.findAll({
                order: [
                    ['date_', 'DESC']
                ]
            }))
        } catch (error) {
            console.log(error)
            res.json(false)
        } finally {
            await conexion.cerrar(con);
        }
    },


}

module.exports = ticket