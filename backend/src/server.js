import express                  from "express";
import dotenv                   from "dotenv";
import cors                     from "cors";
import cookieParser             from "cookie-parser";
import path                     from "path";  // For Deployment
import { fileURLToPath }        from 'url';   // For Deployment

import connectDB                from "./db/database.config.js";
import shortUrl                 from "./route/shortUrl.route.js";
import { redirectFromShortUrl } from "./controller/shortUrl.controller.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT;
const app  = express();

const __filename = fileURLToPath(import.meta.url);               // For Deployment
const __dirname = path.resolve(path.dirname(__filename));        // For Deployment
// const __dirname = path.resolve();                             // For Deployment

app.use(cors({
    origin: ['http://localhost:3000','http://192.168.0.101:3000'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1",shortUrl);         // create short url from user provide full url
app.get("/:id",redirectFromShortUrl);  // redirect to full url 

// For Deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port number : ${port}`);
    connectDB();
})