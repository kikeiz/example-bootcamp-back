
const model= require("../models/scootersModel.js")

const getLoc=(a)=> {
    const geoLoc= a.split(",")
    const [lng , lat ]= geoLoc
    return {lng, lat}
}

const scootersInZone = async (req, res)=>{
    if (!req.params.geometry){
        res.status(400).json({message: "no se ha encontrado su ubicacion" })
    }
    else if (req.params.geometry){
        const {lng, lat}= getLoc(req.params.geometry)
        try{ 
            const features= await model.scootersInZone(parseFloat(lng), parseFloat(lat))
            res.status(200).json({features})}
        catch(error){
            if (error.message === "Error: no se han encontrado scooters cerca"){
            res.status(400).json({message: error.message})}
            else
            res.status(500).json({message: "ups, hemos tenido un problema en la conexion con la base de datos"})
        }
    }
}
const availableScooterState= async (req, res)=>{
    // validar los datos.comprobar que exite una scooter con ese id.
    const id= parseInt(req.params.id)
    const state= 1
    try{
        await model.bookingScooter(id, state)
        res.status(201).json("request completed")
    }catch(error){
        res.status(500).json({error: "ups, we can't update Status"})
    }
}

module.exports={
    scootersInZone,
    availableScooterState
}