const mongoose = require("mongoose");

//schema
const FoodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "food title is required"],
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    price: {
      type: Number,
      required: [true, "food price is required"],
    },

    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      min: 5,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    Restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", FoodSchema);
