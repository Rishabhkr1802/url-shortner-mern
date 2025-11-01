import { saveShortUrl } from "../dao/shortUrl.dao.js";

export async function shortUrlServiceWithoutUser(url, shortUrl) {
    const res = await saveShortUrl(url, shortUrl);
    return res;
}

export async function shortUrlServiceWithUser(url, shortUrl, name) {
    const res = await saveShortUrl(url, shortUrl, name);
    return res;
}

export async function getOriginalFullService(id) {
    const res = await fetchUrl(id);
    return res;
}