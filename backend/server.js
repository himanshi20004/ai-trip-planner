const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log(process.env.DB_URI);
const connectDatabase = require('./config/db');
const formRoutes = require('./routes/formRoutes');
const tripRoutes = require('./routes/tripRoutes');  // <-- import your new route

const app = express();

app.use(cors());
app.use(express.json());

// Existing routes
app.use('/api/form', formRoutes);

// New trip generation routes
app.use('/api/trip', tripRoutes); 

// Connect to DB, then start server
connectDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
