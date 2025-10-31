import express from "express";
import { generateShortUrl } from "../controller/url.controller.js";

const router = express.Router();

router.post('/create', generateShortUrl);

export default router;