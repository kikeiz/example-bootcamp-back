const TripManager = require("../models/tripModels")

const completeTrip = async (req, res) => {
    const tripId = parseInt(req.params.id)
    // faltacomprobar que ese viaje existe
    const { time, lng, lat } = req.body;
    try {
        const payload = await TripManager.completeTrip(tripId, time, lng, lat);
        res.status(201).json(payload)
    } catch (error) {
        res.status(500).json({ message: "El viaje no ha podido ser completado, ha habido un problema en el servidor" })
    }
}

const getOnlyTrip = async (req, res) => {
    const tripId = parseInt(req.params.id);
    try {
        const payload = await TripManager.getOnlyTrip(tripId);
        if (payload) {
            return res.status(200).json(payload);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

const getAllTrip = async (req, res) => {
    const tripId = parseInt(req.params.id);
    try {
        const payload = await TripManager.getAllTrip();
        if (payload) {
            return res.status(200).json(payload);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}




module.exports = { completeTrip, getOnlyTrip, getAllTrip }