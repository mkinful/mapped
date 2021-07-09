const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

dotenv.config();

app.use(express.json())

mongoose
    .connect(process.env.MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => console.log(err));

    app.use('/backend/pins', pinRoute);
    app.use('/backend/users', userRoute);

app.listen(5000, ()=> {
    console.log('Backend running successfully!');
})