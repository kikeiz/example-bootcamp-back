const startConnection = require('../config/connectiondb');
require('dotenv').config();

const client = startConnection()

class scootersManager {

    static async scootersInZone(lng, lat) {
        const query = 'SELECT scooter_id, batery, lng, lat from scooter where status_id = 1 and lng <= $1 and lng > $2 and lat >= $3 and lat < $4'
        const values = [lng + 0.2, lng - 0.2, lat - 0.1, lat + 0.1]
        try {
            const data = await client.query(query, values)
            const payload = data.rows
            if (data.rows.length === 0) {
                throw Error("no se han encontrado scooters cerca")
            }
            return payload
        } catch (error) {
            throw Error(error)

        }
    }

    static async updateScooter(id, lng, lat) {
        const query = 'UPDATE scooter SET lng= $1, lat= $2, status_id= 1 WHERE scooter_id = $3'
        try {
            const data = await client.query(query, [lng, lat, id])
            console.log(data.rows)
            return true

        } catch (error) {
            const errorMessage = { message: "fail updating scooter geometry", error }
            return errorMessage
        }

    }
    static async bookingScooter(id, status = 2) {
        const query = 'UPDATE scooter SET status_id= $1 WHERE scooter_id = $2 returning *'
        try {
            const data = await client.query(query, [status, id])
            console.log(data.rows)
            return true

        } catch (error) {
            console.log(error)
            throw Error("ups, we cant complete the request, scooter_state can't be updated")
        }
    }
    static async getScooterInfo(type, id) {
        const query= `SELECT ${type} from scooter WHERE scooter_id = $1`
        try {
            const data = await client.query(query, [id])
            console.log(data.rows, data.rows[0])
            return data.rows[0]

        } catch (error) {
            console.log(error)
            throw Error("ups, we had a problem getting the scooter info in server")
        }
    }
}


module.exports = scootersManager