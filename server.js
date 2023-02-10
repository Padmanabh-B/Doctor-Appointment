const express = require('express')
const app = express()
require('dotenv').config()
require("./config/dbConfig").dbConnection()
const userRoute = require('./routes/userRoute')
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use('api/users',userRoute)

app.listen(PORT, ()=>{
    console.log(`Node Server Started at Port ${PORT}`);
})