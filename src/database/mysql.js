require('dotenv').config();
const jwt = require('jsonwebtoken')
const fs=require("fs");
const cCA = fs.readFileSync(`${__dirname}/../DigiCertGlobalRootCA.crt.pem`)
const Sequelize = require('sequelize');


const conexion = {
    abrir: async (cookies) => {
        let data = {data:{rol:cookies}}
        if(cookies != "login"){
            try {
                data = jwt.verify(cookies, process.env.JWT_SECRET)
            } catch (error) {
                console.log(error)
                data = {data:{rol:cookies}}
            }
        }

        const technical = data.data.rol === "Technical";

        const dbUser = technical ? process.env.MYSQL_USER : process.env.MYSQL_USER_VOLUNTEER
        const dbPassword = technical ? process.env.MYSQL_USER_VOLUNTEER : process.env.MYSQL_PASS_VOLUNTEER

        const sequelize = new Sequelize(process.env.MYSQL_NAME, dbUser, dbPassword, {
            host: process.env.MYSQL_HOST,
            dialect: 'mysql',
            port: 3306,
            dialectOptions: {
                ssl: {
                  ca: cCA
                }}
        })

        try {
            await sequelize.authenticate()
            console.info("Sequelize authentication successful")
            return sequelize;
        } catch (error) {
            console.error('Error authenticating')
        }

    },
    cerrar: async (con) => {
        await con.close();
        console.log("Cerrada Sequelize");
    }
}


module.exports = conexion;