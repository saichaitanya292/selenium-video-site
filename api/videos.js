import axios from "axios";

export default async function handler(req, res) {
  const API_KEY = process.env.YT_API_KEY;
  const searchQuery = req.query.q || "selenium testing tutorial";
  const pageToken = req.query.pageToken || "";

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
          pageToken: pageToken,
          key: API_KEY
        }
      }
    );

    res.status(200).json({
      videos: response.data.items,
      nextPageToken: response.data.nextPageToken || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}