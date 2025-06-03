const dotenv = require('dotenv');
dotenv.config();

const config = {
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/TravelWebsite",
    
};

module.exports = config;
