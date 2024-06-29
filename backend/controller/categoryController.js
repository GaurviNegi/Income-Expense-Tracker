const Category = require("../model/Category");
const asyncHandler = require('express-async-handler');
const Transaction = require("../model/Transaction");

const categoryController ={
  //!create
  add :asyncHandler(async(req, res)=>{
    //get the data 
    const {name , type } = req.body;
    console.log(req?.user);
    //validation 
    if(!name || !type){
        throw new Error("Please Provide All Fields.");
    }
  
    //normalization 
    const normalizedName  = name.toLowerCase();
    const validTypes = ["income", "expense"];
    //check if valid type 
    if(!validTypes.includes(type.toLowerCase())){
        throw new Error(`Invalid Category Type ${type}`);
    }

    //check if category exists in the user 
    const categoryExists = await Category.findOne({
        user:req?.user,
        name:normalizedName
    });

    if(categoryExists){
        throw new Error(`Category ${categoryExists.name} already exists in database`);
    }

    //create the category 
    const newCategory  = await Category.create({
        name:normalizedName,
        user:req.user,
        type
    });

    res.status(201).json(newCategory);
}),

//!lists
lists : asyncHandler(async(req, res)=>{
   const categories = await Category.find({
    user:req.user
   });

   res.status(200).json(categories);
}),

//!update list  
update : asyncHandler(async(req, res)=>{
    //get the data
   const categoryId = req.params.id;
   const {type , name} = req.body;

    //normalization 
      const normalizedName = name.toLowerCase();

   //fetch category 
   const category = await Category.findById(categoryId) ;

   //check if authorized user 
   if(!category && category.user.toString() !== req.user.toString()){
        throw new Error("Category not found or unauhtorized user");
   }

   const categoryExists = await Category.findOne({name:normalizedName});
   if(categoryExists){
    throw new Error("Category already exists in the database...");
   }
   const oldname = category.name;
   //update the category
   category.name = normalizedName;
   category.type = type || category.type;
   
   //save the updated category
   const updatedCategory = await category.save();

   //update the affected transaction 
   if(oldname !== updatedCategory.name){
    await Transaction.updateMany({
        user:req.user,
        category:oldname
    },{
       $set:{
        category: updatedCategory.name,
        type:updatedCategory.type
       } 
    });
   }
  

   res.status(200).json(updatedCategory);
}),

//!delete category
delete: asyncHandler(async(req, res)=>{
    console.log("hello");
    //fetch category
   const category = await Category.findById(req.params.id);
   console.log(category ,req.params.id);
   //check authorized user 
   if(category && category.user.toString() === req.user.toString()){
    const defaultCategory = "Uncategorized";
    console.log("in");
    //update all the transaction having the catgeory i params 
    await Transaction.updateMany({
        user:req.user,
        category:category.name,   
    },{
        $set:{
            category:defaultCategory
        }
    });

    //remove the category 
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Category successfully deleted and transaction updated "});
   }
   else{
    throw new Error("Category not found or user not authorized");
   }
})
}

module.exports = categoryController;