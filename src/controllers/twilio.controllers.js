require('dotenv').config();

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const twilio = {
    twilio: async (first_name, title, date_, location) => {
        const dateString = date_.toLocaleString("es-ES")
        console.log(dateString)
        client.messages
            .create({
                body: `Hola ${first_name}! Próximo taller: ${title} el dia ${dateString} en ${location}. Confirma tu asistencia llamando a éste telefono: 915165029`,
                from: "+16203203627",
                to: process.env.DESTINATION_PHONE
            })
            .then(message => console.log(message.sid));
    },
}

module.exports = twilio