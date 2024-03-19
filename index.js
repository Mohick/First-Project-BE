// get library express
const express = require("express");
const app = express();
const cors = require("cors");
const optionsCors = require("./Config Cors")

app.use(cors(optionsCors))
// Mongoose
const connectDB = require("./src/Connect MongoseDB/ConnectDB");
// port server  
const port =Number(process.env.port) || 3000;

require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
// get value of json property
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// use morgan
var morgan = require("morgan");
app.use(morgan("combined"));
// Run Connect MongoDB
connectDB();
//  usse Cookie-session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const options = {
  mongoUrl: "mongodb://localhost/API_Best_Music",
  ttl: Number( process.env.ageCookiesSession) || 7 * 24 * 60 * 60, // = 7 days. Default
};

app.use(
  session({
    secret: "keyboard cat",
    resave: JSON.parse(process.env.security),
    saveUninitialized: JSON.parse(process.env.httpOnly),
    store: MongoStore.create(options),
    cookie: {
      secure: JSON.parse(process.env.security), // Thay đổi nếu sử dụng HTTPS
      httpOnly: JSON.parse(process.env.httpOnly),
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60 * 24 * Number( process.env.ageCookiesSession),
    },
  })
);
  
// override mothod form protocol
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
// connect use library express-handlebars allowing protocol http for dev
const hbs = require("express-handlebars");
app.engine(".hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");

// use static files
const path = require("path");
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.static('.'))
// take and controll routes
const routes = require("./src/Router/Router Page");
routes(app);
// listen on port at http://localhost:3000
// if can not accses port 3000 you could use http://localhost:3000/login because you no yet login
app.listen(port, () => {
  console.log(`port server http://localhost:${port}/`);
});
