const express = require('express')
const app = express()
require('dotenv').config()
require("./config/dbConfig").dbConnection()
app.use(express.json())
const userRoute = require('./routes/userRoute')

app.use('/api/user',userRoute)

const PORT = process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.send("This is Server")
    console.log("Hello This is Server");
})

app.listen(PORT, ()=>{
    console.log(`Node Server Started at Port ${PORT}`);
})