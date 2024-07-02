const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createCatController,
  getCatByIdController,
  DeleteCatController,
} = require("../controllers/categoryController");
const { getAllCatController } = require("../controllers/categoryController");

const router = express.Router();
//routes
//create categoryy
router.post("/create", authMiddleware, createCatController);
//get all categories
router.get("/getAll", getAllCatController);
//getCatById
router.get("/getCat/:id", getCatByIdController);
//delete
router.delete("/deleteCat/:id",DeleteCatController)
module.exports = router;

