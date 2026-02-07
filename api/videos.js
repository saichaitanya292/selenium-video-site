export default async function handler(req, res) {
  try {
    const query = req.query.q || "selenium automation tutorial";
    const pageToken = req.query.pageToken || "";

    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        error: "YouTube API key missing",
        videos: []
      });
    }

    const url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?part=snippet&type=video&maxResults=12` +
      `&q=${encodeURIComponent(query)}` +
      `&key=${API_KEY}` +
      (pageToken ? `&pageToken=${pageToken}` : "");

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({
        error: data.error.message,
        videos: []
      });
    }

    res.status(200).json({
      videos: data.items || [],
      nextPageToken: data.nextPageToken || null
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
      videos: []
    });
  }
}