const express = require("express");
const cors = require("cors");
const http = require("http");
const sequelize = require("./src/db/dbConnection");
const routes = require("./src/routes/index");
var cookies = require("cookie-parser");

const app = express();
const server = http.createServer(app);

const jwt = require("./src/middleware/JWT");
require("dotenv").config();

// app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
    origin: process.env.CLIENT_URL ?? "http://localhost:3000",
  })
);
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

server.listen(5000, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});

//http://localhost:5000

jwt.createToken();
jwt.vertifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibm90byIsImlhdCI6MTY5ODY4MjYzMH0.R-9en1ETaOrodGz3EeeZO6UrMZO9af4K471RMGTtezk"
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

app.use("/api/v1", routes);
//http://localhost:5000/api/v1/first-step-registeration
