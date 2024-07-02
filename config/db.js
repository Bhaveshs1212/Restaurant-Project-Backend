const mongoose = require("mongoose");
const colors = require("colors");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.log("DB ERROR",error);
        
    }
};
module.exports = connectdb;