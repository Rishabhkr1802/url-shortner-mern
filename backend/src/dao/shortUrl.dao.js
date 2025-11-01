import Url from "../model/shortUrl.model.js";

export async function saveShortUrl(fullUrl, shortUrl, name) {
    try {
        const newURl = await Url.create({
            full_url : fullUrl,
            short_url: shortUrl,
        })
        if(name) {
            newURl.name = name;
        }
        newURl.save();
        return newURl;
    } catch (error) {
        console.log("Error occuring inside saveShortUrl Dao", error);
    }
}

export async function fetchUrl(id) {
    try {
        const url =  await User.findOneAndUpdate({short_url: id}, {$inc: { click: 1 }});
        return url;
    } catch (error) {
        console.log("Error occuring inside fetchUrl Dao", error);
    }
}