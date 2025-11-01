import express from "express";
import { createShortUrl, redirectToShortUrl } from "../controller/shortUrl.controller.js";

const router = express.Router();

router.post('/create', createShortUrl);
router.get('/:id', redirectToShortUrl);

export default router;