const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  deleteFoodController,
  updateFoodController,
  placeOrderController,
  orderStatusController
} = require("../controllers/foodController");
const AdminMiddleware = require("../middleware/AdminMiddleware");


const router = express.Router();
//create food
router.post("/create",authMiddleware, createFoodController);
//get all food
router.get("/getAll", getAllFoodController);
//get food by id
router.get("/getfood/:id", getFoodByIdController);
//deletefood
router.delete("/deletefood/:id",authMiddleware,deleteFoodController)
//update fooditem
router.put("/update/:id", authMiddleware, updateFoodController)
//place order
router.post("/placeorder", authMiddleware, placeOrderController);
//change 0rder status
router.post(
  "/orderStatus/:id",
  authMiddleware,
  AdminMiddleware,
  orderStatusController
);;module.exports = router;
