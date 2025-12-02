import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// YOUR ORIGINAL API KEY
const API_KEY = "681488c7c163461b8d6eadd5755bb003";

app.get("/api/screenshot", async (req, res) => {
  const site = req.query.site;

  if (!site) {
    return res.status(400).json({ error: "Missing 'site' query parameter" });
  }

  try {
    const screenshotUrl = `https://screenshot.abstractapi.com/v1/?api_key=${API_KEY}&url=${encodeURIComponent(site)}`;

    // Fetch screenshot as binary
    const response = await axios.get(screenshotUrl, {
      responseType: "arraybuffer",
    });

    // Set correct headers
    res.set("Content-Type", "image/png");
    res.send(response.data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate screenshot" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
