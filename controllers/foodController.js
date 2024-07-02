const Foodmodel = require("../models/Foodmodel");
const OrderModel = require("../models/OrderModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      Restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new Foodmodel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      Restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};
//get all food api
const getAllFoodController = async (req,res) => {
    try {
           const foods = await Foodmodel.find({});
           if (!foods) {
             return res.status(404).send({
               success: false,
               message: "No foods found",
             });
           }
           res.status(200).send({
             success: true,
             totalCat: foods.length,
             foods,
           });
    } catch (error) {
          res.status(500).send({
            success: false,
            message: "Error in get all food api",
            error,
          });
    }
}
//get food by id
const getFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      res.status(411).send({
        success: false,
        msg: "please provide food id",
      });
    }
    const food = await Foodmodel.findById(foodId);
    if (!food) {
      res.status(404).send({
        success: false,
        msg: "food doesnt exist",
      });
    }
    res.status(200).send({
      success: true,
      msg: "food fetched succesfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in get food by id API",
      error,
    });
  }
};
//delete food
const deleteFoodController = async (req,res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            res.status(500).send({
                success:false,
                msg:"provide food id"
            })
        }
        const food = await Foodmodel.findByIdAndDelete(foodId)
        if(!food){
            res.status(404).send({
                success:false,
                msg:"food not found"
            })
        }
        res.status(200).send({
            success:true,
            msg:"deleted food succesfully"
        })
    } catch (error) {
           console.log(error);
           res.status(500).send({
             success: false,
             message: "Erorr in get food by id API",
             error,
           });
    }
}
//update food
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await Foodmodel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    const updatedFood = await Foodmodel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Update Food API",
      error,
    });
  }
};
//order food
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    // let total = 0;
    // //cal
    // cart.map((i) => {
    //   total += i.price;
    // });

    const newOrder = new OrderModel({
      foods: cart,
    //   payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Place Order API",
      error,
    });
  }
};
//change order status
const orderStatusController = async (req,res) => {
try {
    const orderid = req.params.id
    if(!orderid){
        res.status(404).send({
success:false,
msg:"please provide valid id"
        })
    }
    const {status} = req.body
    const order = await OrderModel.findByIdAndUpdate(orderid,{status},{new:true})
    res.status(200).send({
        success:true,
        msg:"order status updated"
    })
} catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In order status change API",
        error,
      });
}
}

module.exports = { createFoodController,getAllFoodController,getFoodByIdController,deleteFoodController,updateFoodController,placeOrderController ,orderStatusController};