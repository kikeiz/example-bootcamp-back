const startConnection = require('../config/connectiondb');
const scootersManager = require("./scootersModel")
const BookingManager = require("./bookingModels")
require('dotenv').config();

const client = startConnection()

class Payment {
    constructor(trip_id, tripTime) {
        this.trip_id = trip_id
        this.tripTime = tripTime
        this.basePrice = 0.004
        this.taxes = 0.21
        this.total_price = this.PriceCalculator()
    }
    PriceCalculator = () => {
        const result = this.tripTime * this.basePrice * (1 + this.taxes)
        return parseFloat(result).toFixed(2)
    }
}


class TripManager {


    static async getOnlyTrip(client_id ) {
        const BDClient = startConnection();
        const queryresponse = await BDClient.query('SELECT trips.* FROM trips JOIN booking ON trips.booking_id = booking.booking_id WHERE booking.client_id = $1', [client_id]);
        console.log(queryresponse)
        BDClient.end();
        console.log(queryresponse)
        return queryresponse.rows;
    };


    static async getAllTrip() {
        const BDClient = startConnection();
        const queryresponse = await BDClient.query('SELECT trips.* FROM trips JOIN booking ON trips.booking_id = booking.booking_id');
        console.log(queryresponse)
        BDClient.end();
        console.log(queryresponse)
        return queryresponse.rows;
    };

    
    static async completeTrip(tripId, time, lng, lat) {
        const queryTrip = (`UPDATE trips SET end_date = $1 , lng_end = $2, lat_end = $3  WHERE trip_id = $4 RETURNING *`)
        const queryClient = ('UPDATE clients SET balance = balance - $1 , no_trips = no_trips + 1 WHERE client_id = $2 RETURNING *')
        try {
            const payload = await client.query(queryTrip, [time, lng, lat, tripId])
            const trip = payload.rows[0]
            const { start_date, end_date, scooter_id, booking_id } = trip
            const booking = await BookingManager.getBooking(booking_id)
            if (booking.error) {
                return booking
            }
            const updateScooter = await scootersManager.updateScooter(scooter_id, lng, lat)
            if (updateScooter.error) {
                return updateScooter
            }
            const totalTime = this.timeCalculator(start_date, end_date)
            // Falta Comprobar que no existe ya una bill asociada al trip
            const bill = new Payment(tripId, totalTime)
            const payment = await this.createPayment(bill)
            // Resta a Client el precio del viaje y suma uno a sus viajes
            const updateClient = await client.query(queryClient, [bill.total_price, booking.client_id])
            if (updateClient.rows.length === 0) {
                console.log(updateClient)
                return updateClient
            }
            const clientupdated = updateClient.rows[0]
            const response = { payment, clientupdated }
            return response
        } catch (error) {
            console.log(error)
            throw Error("ups, we can't update the trip")
        }
    }

    static timeCalculator(timedate1, timedate2) {
        const time1 = new Date(timedate1).valueOf()
        const time2 = new Date(timedate2).valueOf()
        const difference = parseInt(time2) - parseInt(time1)
        const totalTimeinMinutes = Math.abs(difference / 1000)
        return totalTimeinMinutes
    }

    static async createPayment(bill) {
        const query = ('INSERT INTO payments (trip_id, triptime, baseprice, taxes, total_price) VALUES ($1, $2,$3, $4, $5) RETURNING *')
        try {
            const payload = await client.query(query, [bill.trip_id, bill.tripTime, bill.basePrice, bill.taxes, bill.total_price])
            console.log(payload.rows[0])
            return payload.rows[0]
        } catch (error) {
            console.log(error)
            throw Error("ups, we can't create the payment")
        }

    }
}


module.exports = TripManager