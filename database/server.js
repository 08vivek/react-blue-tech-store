const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
//const User = require('./models/user');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 

//app.use(express.static(path.join(__dirname,'build')));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri , { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use(userRouter);
//app.get('/*',(req,res) => {
//    res.sendFile(path.join(__dirname,'build','index.html'));
//});

app.listen(port,() => { 
    console.log(`server running on port: ${port}`);
});
