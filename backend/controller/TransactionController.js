const Transaction = require("../model/Transaction");
const asyncHandler = require('express-async-handler');

const transactionController ={
  //!create
  create  :asyncHandler(async(req, res)=>{
    //get the data 
    const {type , amount , description , date , category } = req.body;
    console.log(req?.user);
    //validation 
    if(!amount|| !type || !date){
        throw new Error("type , amount and date fields are required.");
    }
  
    //creating the transaction 
    const newTransaction = await Transaction.create({
        user:req?.user,
        type,
        amount,
        category,
        description,
        date
    });

    //sending the response
    return res.status(201).json(newTransaction);
   
}),

//!lists
getFilteredTransactions : asyncHandler(async(req, res)=>{
    const {startDate , endDate , type ,category} = req.query

    //filter obj
   const filters= {
    user:req.user
   }
   //modifying filters
   if(startDate){
    filters.date = {...filters.date ,$gte: new Date( startDate )};
   }

   if(endDate){
    filters.date = {...filters.date ,$lte: new Date( endDate )};
   }

   if(type){
    filters.type = type;
   }

   if(category){
    if(category==='All'){
        //!not category filter is needed
    }
    else if(category==="Uncategorized"){
        //!filter all transaction categorized as uncategorized
        filters.category = "Uncategorized";
        }
    else{
        //!filter by specific category
        filters.category = category
    }    
   }

   //find the user based on the filters 
   const transactions = await Transaction.find(filters).sort({date:-1});

   //sending the response
   res.status(200).json(transactions);
}),

//!update list  
 updateTransaction: asyncHandler(async(req, res)=>{
    //find the transaction 
    const transaction = await Transaction.findById(req.params.id);
    // if(!transaction){throw new Error("Transaction Not Found");}

    if(transaction && transaction.user.toString() === req.user.toString()){
         (transaction.type = req.body.type || transaction.type);
         (transaction.amount = req.body.amount || transaction.amount);
         (transaction.date = req.body.date || transaction.date);
         (transaction.description = req.body.description || transaction.description);
         (transaction.category = req.body.category || transaction.category);

         //saving the changes 
         const updatedTransaction = await transaction.save();
        
         //sending the response 
         return res.status(200).json({updatedTransaction});
    }
    else{
        throw new Error("Transaction not found or user not authorized");
    }
}),

deleteTransaction :asyncHandler(async(req, res)=>{
    //find the transaction 
    const transaction = await Transaction.findById(req.params.id);
    // if(!transaction){throw new Error("Transaction Not Found");}

    if(transaction && transaction.user.toString() === req.user.toString()){
        await Transaction.findByIdAndDelete(req.params.id);
        //sending the response 
        res.status(200).json({message:"Transaction removed "});
    }
    else{
        throw new Error("Transaction not found or usre not uathorized ");
    }
})
}
 


module.exports = transactionController