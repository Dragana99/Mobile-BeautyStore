const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');

//allow all* http request form any origin
app.use(cors());
app.options('*',cors());

//URL variable
const api = process.env.API_URL;

//middleware librarys
app.use(express.json());//umesto bodyparser jer je deprecated
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads')); // _diranme root putanja aplikacije - staticka putanja za fajlove http://localhost:3000/public/uploads/Loreal_filler_dnevna_krema_1.jpg-1653235446795.jpeg
app.use(authJwt());//token za pozive
app.use((err, req, res, next) => {
    if(err){
        res.status(500).json({message: err})
    }
})


//Product Router
const productsRouter = require('./routers/products');
app.use(`${api}/products`, productsRouter);
//CAtegories Router
const categoriesRouter = require('./routers/categories');
app.use(`${api}/categories`, categoriesRouter);
//Product Router
const ordersRouter = require('./routers/orders');
app.use(`${api}/products`, ordersRouter);
//Product Router
const usersRouter = require('./routers/users');
app.use(`${api}/users`, usersRouter);
//Order
const orderRouter = require('./routers/orders');
app.use(`${api}/orders`, ordersRouter);


//Database connection
mongoose.connect(process.env.CONNECTION_STRING, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'eshop-database'
    })
.then(()=>{
    console.log('database connection ready');
})
.catch((err)=>{
    console.log(err);
})

//Server
app.listen(3000, ()=>
{
    console.log("Server is running")
})