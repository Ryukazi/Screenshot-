import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// YOUR APIFLASH ACCESS KEY
const API_KEY = "b1ba64a7f07d446b9e032d6212365886";

app.get("/api/screenshot", async (req, res) => {
  const site = req.query.site;

  if (!site) {
    return res.status(400).json({ error: "Missing 'site' query parameter" });
  }

  try {
    // APIFLASH DIRECT IMAGE URL
    const screenshotUrl =
      `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}` +
      `&wait_until=page_loaded&url=${encodeURIComponent(site)}`;

    // Fetch image as buffer
    const response = await axios.get(screenshotUrl, {
      responseType: "arraybuffer",
    });

    // Try detecting image type (PNG or JPEG)
    const contentType =
      response.headers["content-type"] || "image/png";

    res.set("Content-Type", contentType);
    res.send(response.data);

  } catch (err) {
    console.error("Screenshot Error:", err.message);
    res.status(500).json({ error: "Failed to generate screenshot" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
