const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Fix: Reliance/Jio ISP DNS cannot resolve MongoDB Atlas SRV records in Node.js.
// Override to use Google Public DNS instead.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Db Connected SuccessFully"))
        .catch((error) => {
            console.log("DB Connection Failed");
            console.error(error);
            process.exit(1);
        })
}