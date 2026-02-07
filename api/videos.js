import axios from "axios";

export default async function handler(req, res) {
  const API_KEY = process.env.YT_API_KEY;

  // Get search keyword from query param
  const searchQuery = req.query.q || "selenium testing tutorial";

  if (!API_KEY) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: searchQuery,
          type: "video",
          maxResults: 12,
          key: API_KEY
        }
      }
    );

    res.status(200).json(response.data.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}