const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { createRestaurantController, getRestaurantByIdController } = require("../controllers/restaurantController");
const { getAllRestaurantController,deleteRestaurantController } = require("../controllers/restaurantController");

const router = express.Router();
//routes
//create restaurant
router.post("/create",authMiddleware,createRestaurantController)
//get restaurant data
router.get("/getAll", getAllRestaurantController);
//get restaurant by id
router.get("/get/:id",getRestaurantByIdController);
//delete restaurant
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);
module.exports = router;
