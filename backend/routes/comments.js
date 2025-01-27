const express = require('express');
const { google } = require('googleapis');
const Comment = require('../models/Comment');
const router = express.Router();
// const cors=require('cors');

router.post('/comments/analyze', async (req, res) => {
  const { videoLink } = req.body;

  // Check if the videoLink is provided
  if (!videoLink) {
    return res.status(400).json({ message: 'No video link provided' });
  }

  // Validate video link using regex
  const videoIdMatch = videoLink.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    return res.status(400).json({ message: 'Invalid YouTube video link' });
  }

  // Check if YouTube API key is missing
  if (!process.env.YOUTUBE_API_KEY) {
    return res.status(500).json({ message: 'YouTube API key is missing' });
  }

  try {
    const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });
    const response = await youtube.commentThreads.list({
      videoId,
      part: 'snippet',
      maxResults: 100,
    });

    const comments = response.data.items.map((item) => {
      const comment = item.snippet.topLevelComment.snippet;
      const maskedUsername = comment.authorDisplayName.replace(/./g, '*');

      return {
        videoLink,
        comment: comment.textDisplay,
        maskedUsername,
        sentiment: 'neutral', // Placeholder for sentiment analysis
        createdAt: new Date(comment.publishedAt),
      };
    });

    // Prevent duplicate comments
    const existingComments = await Comment.find({ videoLink, comment: comment.textDisplay });

    if (existingComments.length === 0) {
      await Comment.insertMany(comments);
    }

    res.status(200).json({ message: 'Comments fetched and stored successfully', comments });
  } catch (error) {
    console.error(error); // Logs the full error
    res.status(500).json({ message: 'Error fetching comments', error: error.toString() });
  }
});

module.exports = router;
