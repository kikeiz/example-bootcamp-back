const model = require("../models/bookingModels")
const scooterModel = require("../models/scootersModel")


const tenMinTocancel= (booking_id, scooter_id) =>{ 
    setTimeout( async() => {
        const type = 'status'
        const status = 1
        // consulta el status del booking a los 10 min
        const bookingStatus = await model.getBookingInfo(type, booking_id)
        // si el status sigue siendo falso(no se ha completado la reserva) se cambia el status de la scooter a Available.
        if (bookingStatus === false) {
            const payload = await scooterModel.bookingScooter(scooter_id, status)
            console.log("fin de cron exitoso", payload)
        }
        console.log(bookingStatus)
    }, 605000)};

module.exports = tenMinTocancel