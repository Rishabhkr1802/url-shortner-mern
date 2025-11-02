import Url from "../model/shortUrl.model.js";

export async function saveShortUrl(fullUrl, shortUrl, name) {
    try {
        const newURl = await Url.create({ full_url: fullUrl, short_url: shortUrl })
        if (name) newURl.name = name;

        await newURl.save();
        return newURl;
    } catch (error) {
        console.log("Error occuring inside saveShortUrl Dao", error);
    }
}

export async function fetchOriginalUrl(id) {
    try {
        const url = await Url.findOneAndUpdate({ short_url: id }, { $inc: { clicks: 1 } });
        return url;
    } catch (error) {
        console.log("Error occuring inside fetchOriginalUrl Dao", error);
    }
}