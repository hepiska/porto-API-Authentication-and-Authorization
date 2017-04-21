var express=require('express');
var bodyParser=require('body-parser');
let mongoose= require('mongoose');
let cors=require('cors');
let api=require('./routers/api');
mongoose.connect('mongodb://localhost/user');
let app=express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/api',api);
console.log('server jalan');
app.listen(3000);
