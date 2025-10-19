const express = require('express');
const mongoose = require('mongoose');
const { Schema , model } = require('mongoose');
const cors = require('cors');

const port = 8629;

const app = express();

app.use(cors())

const data = {
    station : '',
     pm2_5 : 6, 
     pm10 : 7, 
     co2 : 100, 
     no2 : 700, 
     o3 : 12, 
     temp : 40, 
     hum : 78, 
     pm1 : 6, 
     o2 : 300, 
     co : 50
}

mongoose.connect('mongodb+srv://ionode:ionode@ionode.qgqbadm.mongodb.net/AQIAlertSys?retryWrites=true&w=majority&appName=ionode')
.then(()=>console.log('MongoDB connected successfuly'))
.catch(err=>console.log('Error :',err))

const aqiSchema = new Schema({
    station: String,
    co2: Number,
    co: Number,
    o2: Number,
    no2: Number,
    o3: Number,
    temp: Number,
    hum: Number,
    pm2_5: Number,
    pm10: Number,
    pm1: Number,
});

const AQI = model("AQI",aqiSchema);

app.get("/api/data", async (req,res) => {
    const allData = await AQI.find({});
    res.status(200).json(allData)
});

app.get("/api/data/update/:station", async (req,res) => {
    const { pm2_5, pm10, co2, no2, o3, temp, hum, pm1, o2, co } = req.query;
    const { station } = req.params;
    let reqStation = await AQI.find({ station : station })??null;
    let updatedData
    // console.log(reqStation);
    

    // console.log(reqStation[0].pm1);
    
    if(reqStation){
        //updatedData = 
        res.status(200).json(await AQI.findOneAndUpdate({ station : station },{
            station : station,
            pm2_5 : pm2_5 ?? data.pm2_5 ?? reqStation.pm2_5,
            pm10 : pm10 ?? data.pm10 ?? reqStation.pm10, 
            co2 : co2 ?? data.co2 ?? reqStation.co2, 
            no2 : no2 ?? data.no2 ?? reqStation.no2, 
            o3 : o3 ?? data.o3 ?? reqStation.o3, 
            temp : temp ?? data.temp ?? reqStation.temp, 
            hum : hum ?? data.hum ?? reqStation.hum, 
            pm1 : pm1 ?? data.pm1 ?? reqStation.pm1, 
            o2 : o2 ?? data.o2 ?? reqStation.o2, 
            co : co ?? data.co ?? reqStation.co
        },
        {new : true }))
    }

    // res.status(200).json(updatedData)
});

app.get("/:station", async (req, res) => {
    const { pm2_5, pm10, co2, no2, o3, temp, hum, pm1, o2, co } = req.query;

    const {station} = req.params
    // console.log(station);
     
    // console.log(pm2_5, pm10, co2, no2, o3, temp, hum, pm1, o2, co);
    
    if (pm2_5 || pm10 || co2 || no2 || o3 || temp || hum || pm1 || o2 || co) {
        console.log('Params :', req.params ,'\n Query : ',req.query  );
        
        const aqiData = new AQI({
            station : station ?? data.station,
            pm2_5 : pm2_5 ?? data.pm2_5,
            pm10 : pm10 ?? data.pm10, 
            co2 : co2 ?? data.co2, 
            no2 : no2 ?? data.no2, 
            o3 : o3 ?? data.o3, 
            temp : temp ?? data.temp, 
            hum : hum ?? data.hum, 
            pm1 : pm1 ?? data.pm1, 
            o2 : o2 ?? data.o2, 
            co : co ?? data.co
        })

        await aqiData.save()

        res.status(200).json({ message: "Your Data is saved",
            data : aqiData
         })
        return
    }

    const latestData = await AQI.find({station}).sort('-1')
    res.status(201).json({ latestData }); 
});

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})