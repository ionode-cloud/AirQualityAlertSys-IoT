require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8629;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DEFAULT DATA ================= */
const DEFAULT_DATA = {
  station: "",
  pm2_5: 6,
  pm10: 7,
  co2: 100,
  no2: 700,
  o3: 12,
  temp: 40,
  hum: 78,
  pm1: 6,
  o2: 300,
  co: 50,
};

/* ================= DB CONNECTION ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error(" MongoDB error:", err));

/* ================= SCHEMA ================= */
const aqiSchema = new mongoose.Schema(
  {
    station: { type: String, required: true },
    pm2_5: Number,
    pm10: Number,
    co2: Number,
    no2: Number,
    o3: Number,
    temp: Number,
    hum: Number,
    pm1: Number,
    o2: Number,
    co: Number,
  },
  { timestamps: true }
);

const AQI = mongoose.model("AQI", aqiSchema);

/* ================= ROUTES ================= */

/* 🔹 Get all AQI data */
app.get("/data", async (req, res) => {
  try {
    const data = await AQI.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔹 Get latest data for one station */
app.get("/data/:station", async (req, res) => {
  try {
    const { station } = req.params;

    const latestData = await AQI
      .findOne({ station })
      .sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ message: "Station not found" });
    }

    res.json(latestData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔹 Create new AQI data */
app.post("/data/:station", async (req, res) => {
  try {
    const { station } = req.params;

    const newData = new AQI({
      station,
      pm2_5: req.body.pm2_5 ?? DEFAULT_DATA.pm2_5,
      pm10: req.body.pm10 ?? DEFAULT_DATA.pm10,
      co2: req.body.co2 ?? DEFAULT_DATA.co2,
      no2: req.body.no2 ?? DEFAULT_DATA.no2,
      o3: req.body.o3 ?? DEFAULT_DATA.o3,
      temp: req.body.temp ?? DEFAULT_DATA.temp,
      hum: req.body.hum ?? DEFAULT_DATA.hum,
      pm1: req.body.pm1 ?? DEFAULT_DATA.pm1,
      o2: req.body.o2 ?? DEFAULT_DATA.o2,
      co: req.body.co ?? DEFAULT_DATA.co,
    });

    await newData.save();

    res.status(201).json({
      message: " AQI data saved successfully",
      data: newData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔹 Update AQI data (or create if not exists) */
app.put("/data/:station", async (req, res) => {
  try {
    const { station } = req.params;

    const updatedData = await AQI.findOneAndUpdate(
      { station },
      {
        station,
        pm2_5: req.body.pm2_5,
        pm10: req.body.pm10,
        co2: req.body.co2,
        no2: req.body.no2,
        o3: req.body.o3,
        temp: req.body.temp,
        hum: req.body.hum,
        pm1: req.body.pm1,
        o2: req.body.o2,
        co: req.body.co,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: " AQI data updated successfully",
      data: updatedData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
