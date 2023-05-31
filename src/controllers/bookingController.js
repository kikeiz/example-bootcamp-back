const BookingManager= require("../models/bookingModels")
const tenMinTocancel= require("../utils/cronFunction")


const bookingRide= async (req, res)=>{
    const {id_user , id_scooter}= req.body;
    const time = new Date().toUTCString();
    try{
        const info= await BookingManager.bookingRide(id_user, id_scooter, time );
        const booking_id= info.data.booking_id
        tenMinTocancel(booking_id, id_scooter);
        res.status(201).json(info)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "ups, we coudnt make your request"})
    }
}

const initTrip= async(req, res)=>{
    const bookId= parseInt(req.params.id)
    const {lng, lat}= req.body
    const time = new Date().toUTCString();
    const type= 'status'
    try{  
        const bookingStatus = await BookingManager.getBookingInfo(type, bookId)
        if(bookingStatus !== false){
            throw Error("este viaje ya ha sido confirmado")
        }
        const info = await BookingManager.initTrip(bookId, time, lng, lat);
        res.status(201).json(info)
    }catch(error){
        if (error.message === "este viaje ya ha sido confirmado o no existe"){
            res.status(400).json({ message: error.message})
        }
        else{
        res.status(500).json({message: "no hemos podido crear su viaje"})}

    }}


module.exports={
    bookingRide,
    initTrip,
    
}