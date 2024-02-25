// get library express
const express = require('express');
const app = express();
// Mongoose
const connectDB = require('./src/Connect MongoseDB/ConnectDB')
// port server
const port = 3000

// get value of json property
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
// use morgan 
var morgan = require('morgan')
app.use(morgan('combined'))

// override mothod form protocol
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
// connect use library express-handlebars allowing protocol http for dev
const hbs = require('express-handlebars')
app.engine('.hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './src/views');

// use static files
const path = require('path');
app.use(express.static(path.join(__dirname, '/public/')));
 // Run Connect MongoDB
connectDB()
// take and controll routes
const routes = require('./src/Router/Router Page')
routes(app)
// listen on port at http://localhost:3000
app.listen(port, () => {
    console.log(`port server http://localhost:${port}`)
})