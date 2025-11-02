import express                  from "express";
import dotenv                   from "dotenv";
import cors                     from "cors";
import cookieParser             from "cookie-parser";
import connectDB                from "./db/database.config.js";
import shortUrl                 from "./route/shortUrl.route.js";
import { redirectFromShortUrl } from "./controller/shortUrl.controller.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT;
const app  = express();

app.use(cors({
    origin: ['http://localhost:3000','http://192.168.0.101:3000'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1",shortUrl);         // create short url from user provide full url
app.get("/:id",redirectFromShortUrl);  // redirect to full url 

app.listen(port, () => {
    console.log(`Server is running on port number : ${port}`);
    connectDB();
})