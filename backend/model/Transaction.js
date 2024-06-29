const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    category:{
        type:String,
        default:"Uncategorized",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["income","expense"]
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        required:false
    }
},{
    timestamps:true
});

const Transaction = mongoose.model("Transaction",transactionSchema);
module.exports = Transaction;