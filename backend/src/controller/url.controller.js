import { generateId } from "../utils/Helper.js";

export async function generateShortUrl(req, res, next) {
    const { fullUrl } = req.body;
    try {
        if (!fullUrl) return res.status(404).json({ success: false, message: "All fields are required." });

        const shortUrl = generateId(7);
        return res.status(201).json({ success: false, message: "url short successfully", url: shortUrl })

    } catch (error) {
        console.log("Error occuring at genrateShortUrl", error);
    }
}