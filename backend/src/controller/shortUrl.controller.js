import { shortUrlServiceWithoutUser } from "../services/shortUrl.service.js";
import { generateNanoID } from "../utils/Helper.js";

export async function createShortUrl(req, res, next) {
    try {
        const { url } = req.body;
        if (!url) return res.status(404).json({ success: false, message: "Url is required." });

        const baseUrl = process.env.BASEURL;
        const id      = generateNanoID(7);
        if (!id) return res.status(404).json({ success: false, message: "short url not generated" })

        const shortUrl = `${baseUrl}${id}`;
        const newUrl = await shortUrlServiceWithoutUser(url, shortUrl);
        if (!newUrl) return res.status(404).json({ success: false, message: "Unable to create short URL." })

        res.status(201).json({ success: true, message: "Short url has created successfully.", shortUrl: newUrl?.short_url })

    } catch (error) {
        console.log("Error occuring at genrateShortUrl", error);
    }
}

export async function redirectToShortUrl(req, res, next) {
    try {
        const { id } = req.params;
        const shortUrl = await getOriginalFullService(id);
        return res.redirect(shortUrl.full_url);
    } catch (error) {
        console.log("Error occuring inside redirectToShortUrl controller: ",error);
    }
}