import express      from "express";
import dotenv       from "dotenv";
import cors         from "cors";
import connectDB    from "./db/database.config.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: ['http://localhost:3000','http://192.168.0.104:3000'],
    credentials: true,
}));

app.listen(port, () => {
    console.log(`Server is running on port number : ${port}`);
    connectDB();
})