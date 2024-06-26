const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// Apply CORS middleware before defining any routes
app.use(cors({
    origin: '*',  // Allow all origins temporarily for debugging
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204
  }));

app.get('/', (req, res) => res.send("API RUNNING"));

app.use('/api/auth', require("./routes/auth"));
app.use("/api/transactions", require("./routes/transaction"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
