const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            msg : "please provide title and address"
        })
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
   newRestaurant.save()
  res.status(201).send({
    success:true,
    msg : "New Restaurant created successfully",
  })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in create restaurant api",
      error,
    });
  }
};
//get all resyaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({}); // Use .lean() to get plain JavaScript objects

    if (!restaurants) {
      return res.status(404).send({
        success: false,
        msg: "No Restaurants Available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in get all restaurants API",
      error,
    });
  }
};
//get restaurnat by id
const getRestaurantByIdController = async (req,res)=>{
try {
    const restaurantid = req.params.id
        if (!restaurantid) {
          return res.status(404).send({
            success: false,
            msg: "please provide restaurant id",
          });
        }
    const restaurant = await restaurantModel.findById(restaurantid)
    if(!restaurantid){
        return res.status(404).send({
            success:false,
            msg:"no rstaurant food"
        })
    }
    res.status(200).send({
        success:true,
        restaurant,

    })
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in get restaurant by id api",
      error,
    });
}
}
//delete restaurant
const deleteRestaurantController = async(req,res) =>{
    try {
        const restaurantid = req.params.id
        if(!restaurantid){
            return res.status(404).send({
                success:false,
                msg:"No restaurant found or provide restaurant id"
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantid);
        res.status(200).send({
            success:true,
            msg:"restaurant deleted succesfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            msg:"error in delete restaurant api",
            error
        });
    }
}

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
