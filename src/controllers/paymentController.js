const {paymentIntent} = require("../models/strypeModels")

const { ClientManager }= require("../models/clients")


const confirmPayment= async (req, res)=>{
    const client_id= parseInt(req.params.id)
    let { id, amount } = req.body 
    amount = parseFloat(amount)
    try{
        console.log(req.body, amount)
        const payment= await paymentIntent({id, amount})
        const userUpdate= await ClientManager.updateClientBalance({client_id, amount})
        console.log(userUpdate, payment)
        res.status(200).json({payment, userUpdate, message:"pago aceptado"})
    }catch(error){
        const message= error.raw ? error.raw.message : "ha habido un problema procesando su solicitud"
        console.log(error)
        res.status(500).json({message})
    }

}

module.exports= confirmPayment 