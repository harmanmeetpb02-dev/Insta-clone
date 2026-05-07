require('dotenv').config();
const app = require('./src/app')
const ConnectToDb = require("./src/config/database")
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);



ConnectToDb()


app.listen(3000,() =>{
    console.log("server is starting port 3000")
})


