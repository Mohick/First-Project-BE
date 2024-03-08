// get library express
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// Mongoose
const connectDB = require("./src/Connect MongoseDB/ConnectDB");
// port server
const port = 3000;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Cập nhật địa chỉ của ứng dụng React của bạn
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// get value of json property
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// use morgan
var morgan = require("morgan");
app.use(morgan("combined"));
//  usse Cookie-session
const MongoStore = require("connect-mongo");
const session = require("express-session");
const options = {
  mongoUrl: "mongodb://localhost/test-app",
  ttl: 90 * 24 * 60 * 60, // = 14 days. Default
  cookie: {
    secure: false, // Thay đổi nếu sử dụng HTTPS
    httpOnly: true,
    sameSite: 'Lax',
  },
};

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore(options),
    cookie: {
      secure: false, // Thay đổi nếu sử dụng HTTPS
      httpOnly: true,
      sameSite: 'Lax',
    }
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
// Run Connect MongoDB
connectDB();
// take and controll routes
const routes = require("./src/Router/Router Page");
routes(app);
// listen on port at http://localhost:3000
app.listen(port, () => {
  console.log(`port server http://localhost:${port}`);
});
