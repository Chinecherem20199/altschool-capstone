import { Request, Response } from "express";
import ShortURL  from '../model/url.model';
import { validateURL } from "../utils/validateUrl";
import { customAlphabet } from "nanoid";

// Generate custom ID
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  5
);

export async function shortenUrl(req: Request, res: Response) {
  try {
    //get original url from request body
    const { originalURL } = req.body;
    console.log(originalURL);
    const hostUrl = "https://altschool-capstone.onrender.com";

    // check if url is valid
    const isValidUrl = validateURL(originalURL);

    if (isValidUrl) {
      //shorten url and return to client
      const shortid = nanoid();
      const completeUrl = `${hostUrl}/${shortid}`;
      const shortenedUrl = new ShortURL({ originalURL, shortUrl: completeUrl, "shortId": shortid});
      await shortenedUrl.save();
      return res.json({completeUrl:`https://altschool-capstone.onrender.com/${shortid}` });
      // return res.send(completeUrl);
    }
    res.send("Invalid URL");
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}
