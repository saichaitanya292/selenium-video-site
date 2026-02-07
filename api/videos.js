// Simple in-memory cache (works perfectly on Vercel)
const cache = {};
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

export default async function handler(req, res) {
  const query = req.query.q || "selenium automation tutorial";
  const pageToken = req.query.pageToken || "";
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const cacheKey = `${query}_${pageToken}`;
  const now = Date.now();

  // 1️⃣ Serve from cache if available
  if (cache[cacheKey] && now - cache[cacheKey].time < CACHE_TTL) {
    return res.status(200).json(cache[cacheKey].data);
  }

  if (!API_KEY) {
    return res.status(200).json({
      videos: [],
      message: "Configuration error. Please try later."
    });
  }

  try {
    const url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?part=snippet&type=video&maxResults=12` +
      `&q=${encodeURIComponent(query)}` +
      `&key=${API_KEY}` +
      (pageToken ? `&pageToken=${pageToken}` : "");

    const response = await fetch(url);
    const data = await response.json();

    // 2️⃣ If quota exceeded → fallback to cache
    if (data.error) {
      if (cache[cacheKey]) {
        return res.status(200).json(cache[cacheKey].data);
      }

      return res.status(200).json({
        videos: [],
        message: "Daily video limit reached. Please try again later."
      });
    }

    const result = {
      videos: data.items || [],
      nextPageToken: data.nextPageToken || null
    };

    // 3️⃣ Save successful response to cache
    cache[cacheKey] = {
      time: now,
      data: result
    };

    return res.status(200).json(result);

  } catch (err) {
    // 4️⃣ Last-resort fallback
    if (cache[cacheKey]) {
      return res.status(200).json(cache[cacheKey].data);
    }

    return res.status(200).json({
      videos: [],
      message: "Temporary issue. Please try later."
    });
  }
}