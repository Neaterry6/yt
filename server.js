const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/play", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ status: false, error: "Missing query" });

  exec(`yt-dlp "ytsearch1:${query}" --print "%(id)s"`, (err, stdout) => {
    if (err || !stdout) return res.status(500).json({ status: false, error: "Search failed" });

    const videoId = stdout.trim();
    const videoUrl = `https://youtube.com/watch?v=${videoId}`;
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    exec(`yt-dlp -f "bestaudio[ext=mp3]/bestaudio" -g "${videoUrl}"`, (err2, stdout2) => {
      if (err2 || !stdout2) return res.status(500).json({ status: false, error: "Audio link failed" });

      const downloadUrl = stdout2.trim();

      res.json({
        status: true,
        type: "audio",
        result: {
          query,
          title: `Audio for "${query}"`,
          download_url: downloadUrl,
          video_url: videoUrl,
          thumbnail,
          duration: "Unknown",
          views: "Unknown"
        }
      });
    });
  });
});

app.get("/video", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ status: false, error: "Missing query" });

  exec(`yt-dlp "ytsearch1:${query}" --print "%(id)s"`, (err, stdout) => {
    if (err || !stdout) return res.status(500).json({ status: false, error: "Search failed" });

    const videoId = stdout.trim();
    const videoUrl = `https://youtube.com/watch?v=${videoId}`;
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    exec(`yt-dlp -f "best[ext=mp4]" -g "${videoUrl}"`, (err2, stdout2) => {
      if (err2 || !stdout2) return res.status(500).json({ status: false, error: "Video link failed" });

      const downloadUrl = stdout2.trim();

      res.json({
        status: true,
        type: "video",
        result: {
          query,
          title: `Video for "${query}"`,
          download_url: downloadUrl,
          video_url: videoUrl,
          thumbnail,
          duration: "Unknown",
          views: "Unknown"
        }
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
