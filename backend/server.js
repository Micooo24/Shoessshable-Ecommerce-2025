const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();

const authRoutes = require("./routes/auth");

// Mongoose
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// Port and IP
const port = process.env.PORT || 8000;
const ip = process.env.IP || '127.0.0.1';

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Use the user routes
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(port, ip, () => console.log(`Server is running on http://${ip}:${port}`));