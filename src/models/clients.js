const startConnection = require('../config/connectiondb');
const { User, UserManager } = require('./users');
require('dotenv').config();

class Client extends User {

    constructor(

        client_id = null,
        balance = null,
        no_trips = null, 
        app_uses = null, 
        mapbox_token = process.env.REACT_APP_MAP_PUBLIC_TOKEN, 

    ){
            super(); 

            this.client_id = client_id;
            this.balance = balance;
            this.no_trips = no_trips;
            this.app_uses = app_uses;
            this.mapbox_token = mapbox_token;
        }
}

class ClientManager extends UserManager {
    static async getClients(){
        const BDClient = startConnection();
        const queryResponse = await BDClient.query("SELECT * FROM clients");
        BDClient.end();
        console.log(queryResponse)
            return queryResponse.rows;
    }

    static async getOnlyClient(client_id){
        const BDClient = startConnection();
        const queryresponse = await BDClient.query("SELECT * FROM clients WHERE client_id = $1", [client_id]);
        BDClient.end();
        console.log(queryresponse)
            return queryresponse.rows;
    }
    static async updateClientBalance({client_id, amount}) {
        const BDClient = startConnection();
        const convertedAmount = amount/100 
        const query = ('UPDATE clients SET balance = balance + $1 WHERE client_id = $2 RETURNING *')
        try{
            const queryresponse = await BDClient.query(query, [convertedAmount ,client_id]);
            return queryresponse.rows[0];
        }catch(error){
            throw error
        }finally{
            BDClient.end();
        }
    }

    static async registerClient(newUser){

        const BDClient =  startConnection();

        let userData = await this.registerUser(newUser); 

        if('error' in userData ){
            console.error(userData);
            return userData;
        }
          
        const client_id = userData.user.user_id;
        const token = userData.token;

        try {

            const data = await BDClient.query(`SELECT * FROM clients WHERE client_id= $1`, [client_id]);
            const arr = data.rows;

            if(arr.length != 0){
                return({
                    error: "Cliente ya registrado",
                });
            } else {
                const client = new Client (client_id, 0, 0, 0,); 

                const newClient = await BDClient.query(`INSERT INTO clients (client_id, balance, no_trips, app_uses, mapbox_token) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
                [client.client_id, client.balance, client.no_trips, client.app_uses, client.mapbox_token]) 
                    
                if('error' in newClient){
                        console.error(newClient);
                        return({
                            error:"Database error"
                        })
                    }
                    else {
                        return({
                            message: 'Cliente añadido a la database',
                            user: userData.user,
                            token: token,
                            id: client_id
                        })
                    }
                }
            }

        
         catch (err) {
            console.log(err);
            return({
                error: "Database error while registring client!",
            });
        };

        
    }

}

module.exports = { Client, ClientManager} 