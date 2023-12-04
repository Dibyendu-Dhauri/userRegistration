const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const userRouter = require('./routes/userRoutes')

const app = express();
const PORT = 8000;
dotenv.config();

app.use(cors({origin:"http://localhost:3000", credentials:true})) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const connect = async()=>{
  try {
   await mongoose.connect(process.env.MONGO_URI)
   console.log("MongoDb connected")
  } catch (error) {
    console.log("Error:",error)
  }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });


app.use('/api',userRouter)


// error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
     res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(PORT, ()=>{
  connect();
  console.log("Server started at:",PORT)
})