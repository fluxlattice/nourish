export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = (req.query?.q || "").toString().trim();
  if (!query) {
    return res.status(400).json({ error: "No query provided" });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return res.status(200).json({ url: null });
  }

  try {
    const response = await fetch(
      "https://api.unsplash.com/search/photos?per_page=1&orientation=landscape&query=" + encodeURIComponent(query),
      { headers: { Authorization: "Client-ID " + accessKey } }
    );

    if (!response.ok) {
      return res.status(200).json({ url: null });
    }

    const data = await response.json();
    const photo = (data.results || [])[0];
    if (!photo) {
      return res.status(200).json({ url: null });
    }

    if (photo.links?.download_location) {
      fetch(photo.links.download_location, { headers: { Authorization: "Client-ID " + accessKey } }).catch(() => {});
    }

    return res.status(200).json({
      url: photo.urls?.small || null,
      photographer: photo.user?.name || null,
      photographerUrl: photo.user?.links?.html || null,
      unsplashUrl: photo.links?.html || null,
    });
  } catch (err) {
    return res.status(200).json({ url: null });
  }
}
