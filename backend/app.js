require("dotenv").config();
require("./utils/dbConnect");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const transactionRouter = require("./routes/transactionRoute");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 8000;
const app  = express();

//!middlewares 
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
}))

//!Routes 
app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",categoryRouter);
app.use("/api/v1/transactions",transactionRouter);
//!error handler middleware 
app.use(errorHandler);

//!listening to the app 
app.listen(PORT ,()=>{
    console.log(`listening at port ${PORT}`);
});