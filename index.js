const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

const userRoutes = require('./route/userRoutes');
const admissionRoutes = require('./route/admissionRoute');
const appointmentRoutes = require('./route/appointmentRoutes');
const billingRoutes = require('./route/billingRoute');
const labRoutes = require('./route/labRoute');

//Database connection
mongoose 
    .connect('mongodb://localhost:27017/hospitalDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/labs', labRoutes);

//Root Endpoint
app.get('/', (req, res) => {
    res.send('Hospital Management System API');
});

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));