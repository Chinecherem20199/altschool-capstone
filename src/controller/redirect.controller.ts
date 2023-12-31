import { Request, Response } from "express";
import ShortURL from "../model/url.model";

export async function redirectURL(req: Request, res: Response) {
  try {
    const { url } = req.params;

    //find corresponding original url from database
    const hostUrl = "https://altschool-capstone.onrender.com"
    let shortenedUrl = await ShortURL.findOne({ shortUrl:`${hostUrl}/${url}` });

    if (!shortenedUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    // checking if referring source if available
    const referringSource = req.headers.referer || "Direct";

    // push the referring source to the array
    shortenedUrl.referringSources.push(referringSource);

    // Update the click by count and last clicked time
    shortenedUrl.clicks = Number(shortenedUrl.clicks) + 1;
    shortenedUrl.lastClickedAt = new Date();
    await shortenedUrl.save();

    //perform the redirect
    res.redirect(shortenedUrl.originalURL);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}
