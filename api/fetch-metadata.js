export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" })
  }

  // Basic URL validation
  try {
    new URL(url)
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL format" })
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BookmarkingBot/1.0)",
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch URL: ${response.statusText}`,
      })
    }

    const html = await response.text()

    res.status(200).send(html)
  } catch (error) {
    console.error("Fetch error:", error)
    res.status(500).json({
      error: "Failed to fetch URL metadata",
      details: error.message,
    })
  }
}
