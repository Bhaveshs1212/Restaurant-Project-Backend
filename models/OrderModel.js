const mongoose = require("mongoose");

//schema
const OrderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods",
      },
    ],
    payment:{},
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["prepared","preparing","on the way","delivered"],
        default:"preparing",
    }
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", OrderSchema);
