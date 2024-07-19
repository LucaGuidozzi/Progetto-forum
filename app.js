import express from "express";
import { MongoClient } from "mongodb";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import db from "./utils/db.js";

const port = process.env.NODE_ENV || 3000;
const app = express();
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(userRouter);

const connect = async () => {
  await mongoClient.connect();
  db.forum = mongoClient.db("forum");
  db.user = db.forum.collection("user");

  console.log("Connessione a MongoDB avvenuta");
  app.listen(port, () => console.log("Server in ascolto sulla porta " + port));
};

connect().catch((err) => console.log(err));
