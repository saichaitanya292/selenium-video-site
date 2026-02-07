import axios from "axios";

export default async function handler(req, res) {
  const API_KEY = process.env.YT_API_KEY;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: "selenium testing tutorial",
          type: "video",
          maxResults: 12,
          key: API_KEY
        }
      }
    );

    res.status(200).json(response.data.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}