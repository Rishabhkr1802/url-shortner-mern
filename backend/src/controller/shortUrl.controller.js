import { getOriginalUrlService, shortUrlServiceWithoutUser } from "../services/shortUrl.service.js";
import { generateNanoID } from "../utils/Helper.js";

export async function createShortUrl(req, res) {
    try {
        const { url } = req.body;
        if (!url) return res.status(404).json({ success: false, message: "Url is required." });

        const id = generateNanoID(7);
        if (!id) return res.status(404).json({ success: false, message: "short url is not created." });
            
        const newUrl = await shortUrlServiceWithoutUser(url, id);
        if (!newUrl) return res.status(404).json({ success: false, message: "Unable to create short URL." })
                
        const baseUrl = process.env.BASEURL;
        res.status(201).json({ success: true, message: "Short url has created successfully.", shortUrl: `${baseUrl}${newUrl?.short_url}` })

    } catch (error) {
        console.log("Error occuring inside createShortUrl Controller : ", error);
    }
}

export async function redirectFromShortUrl(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({ success: false, message: "Id must be required" });

        const shortUrl = await getOriginalUrlService(id);
        if (!shortUrl) return res.status(404).json({ success: false, message: "Invalid short Url" });

        return res.redirect(shortUrl?.full_url);
        // return res.status(200).json({ success: true, message: "Fetch Url successfully", url: shortUrl?.full_url});
    } catch (error) {
        console.log("Error occuring inside redirectFromShortUrl controller: ",error);
    }
}