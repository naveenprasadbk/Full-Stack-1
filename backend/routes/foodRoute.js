import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const foodRouter = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Image Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // ✅ Fallback to default image if no image uploaded
    const image = req.file ? req.file.filename : "default.jpg";

    // Import model here (or from controller)
    const FoodModel = (await import("../models/foodModel.js")).default;

    const newFood = new FoodModel({
      name,
      description,
      price,
      category,
      image
    });

    await newFood.save();
    res.json({ success: true, message: "Food added successfully." });
  } catch (error) {
    console.error("Error in /add route:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
