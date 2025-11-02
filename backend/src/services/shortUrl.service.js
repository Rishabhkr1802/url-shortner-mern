import { fetchOriginalUrl, saveShortUrl } from "../dao/shortUrl.dao.js";

export async function shortUrlServiceWithoutUser(url, shortUrl) {
    if (!url || !shortUrl) return;
    const res = await saveShortUrl(url, shortUrl);
    return res;
}

export async function shortUrlServiceWithUser(url, shortUrl, name) {
    if (!url || !shortUrl || !name) return;
    const res = await saveShortUrl(url, shortUrl, name);
    return res;
}

export async function getOriginalUrlService(id) {
    if (!id) return;
    const res = await fetchOriginalUrl(id);
    return res;
}