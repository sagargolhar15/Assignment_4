const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose=require('mongoose')
const app = express();
const PORT = 3000;
// ejs templete engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname +'/public'));
// connect database
mongoose.connect('mongodb://localhost:27017/mongocurd_assignment',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('error',(err)=>{throw err});
db.once('open',()=>{console.log("database Connected")})

// route
const userRoute=require('./route/index')
app.use("/",userRoute)

app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`the server run on the ${PORT}`)
})
