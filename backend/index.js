// const http = require("http");
const dotenv = require("dotenv");
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();

// getting db path from env
dotenv.config({path: './.env'});
const port = process.env.PORT;

// enabled cors functionality to send request from browser
app.use(cors());

app.use(express.json());

// to get a msg on browser
app.get("/", (req, res) => {
  res.send("HELL ITS WORKIN!");
});

// to create server
// const server = http.createServer(app);

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  if(port) {
    console.log(`Example app listening on port http://localhost:${port}`);
  }
  console.log('YOOOOO!');
});
