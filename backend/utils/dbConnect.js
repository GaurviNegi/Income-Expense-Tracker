const mongoose = require("mongoose");

const dbConnect = async()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongodb successfully connected")).catch((e)=>console.log(e.message));
}

dbConnect();
