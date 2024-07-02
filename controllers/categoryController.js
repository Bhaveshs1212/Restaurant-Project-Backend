const categorymodel = require("../models/categorymodel");

//creaet cat
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        msg: "please provide category title or image",
      });
    }
    const newCategory = new categorymodel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      msg: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in get create category API",
      error,
    });
  }
};
//get all category
const getAllCatController = async (req, res) => {
  try {
    const categories = await categorymodel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in get All Categpry API",
      error,
    });
  }
};
const getCatByIdController = async (req,res) => {
    try {
        const CategoryId = req.params.id;
        if (!CategoryId) {
          res.status(411).send({
            success: false,
            msg: "please provide category id",
          });
        }
        const Category = await categorymodel.findById(CategoryId);
        if (!Category) {
          res.status(404).send({
            success: false,
            msg: "Category doesnt exist",
          });
        }
        res.status(200).send({
          success: true,
          msg: "category fetched succesfully",
          Category,
        });
    } catch (error) {
         console.log(error);
         res.status(500).send({
           success: false,
           message: "Erorr in get Categpry by id API",
           error,
         });
    }
}
//delete
const DeleteCatController = async (req,res) =>{
    try {
               const CategoryId = req.params.id;
               if (!CategoryId) {
                 res.status(411).send({
                   success: false,
                   msg: "please provide category id",
                 });
               }
               const Category = await categorymodel.findByIdAndDelete(
                 CategoryId
               );
               if (!Category) {
                 res.status(404).send({
                   success: false,
                   msg: "Category doesnt exist",
                 });
               }
               res.status(200).send({
                 success: true,
                 msg: "category deleted succesfully",
                
               });
    } catch (error) {
           console.log(error);
           res.status(500).send({
             success: false,
             message: "Erorr in delete catgeory API",
             error,
           });
    }
}
module.exports = {
  createCatController,
  getAllCatController,
  getCatByIdController,
  DeleteCatController,
};
