const Events_ = require("../models/events_.model");
const Users = require("../models/users.model");
const twilio = require("./twilio.controllers")

const event_ = {
    create: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        const { name_, location, date_, theme, description_ } = req.body
        try {
            const evnt = await Events_.create(con);
            const newEvnt = await evnt.create({ name_, location, date_, theme, description_ })     
            twilio.twilio("Mihai", newEvnt.dataValues.name_, newEvnt.dataValues.date_, newEvnt.dataValues.location)
            res.json(true)
        } catch (error) {
            console.log(error)
            res.send(false)
        } finally {
            await conexion.cerrar(con);
        }
    },
    getEvents:async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const evnt = await Events_.create(con);
            const newEvnt = await evnt.findAll()
            res.json(newEvnt)
        } catch (error) {
            console.log(error)
            res.send(false)
        } finally {
            await conexion.cerrar(con);
        }
    },
    getEventById:async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const evnt = await Events_.create(con); 
            res.json(await evnt.findByPk(req.params.id))
        } catch (error) {
            console.log(error)
            res.send(false)
        } finally {
            await conexion.cerrar(con);
        }
    },
}

module.exports = event_