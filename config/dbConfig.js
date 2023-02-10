const mongoose = require("mongoose")
require("dotenv").config()

mongoose.set('strictQuery', false);
exports.dbConnection= () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(console.log(`DB CONNECTED SUCCESSFULLY`))
        .catch(error => {
            console.log(`DB CONNECTION FAILED`);
            console.log(error);
            process.exit(1)
        })
}

