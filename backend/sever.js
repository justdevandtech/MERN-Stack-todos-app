import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 9000;
const app = express();

// import routers
import todoRoute from "./routes/todo.js";

const mongodb_url = process.env.DB_CONNECTION_STRING;

// connectin to mongodb
mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/todos", todoRoute);

app.listen(PORT, (req, res) => {
  console.log("server running on port 9000");
});
