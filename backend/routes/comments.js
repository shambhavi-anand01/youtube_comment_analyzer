
const express = require('express');
const { google } = require('googleapis');
const Sentiment = require('sentiment');
const Comment = require('../models/Comment');
const router = express.Router();

// POST /analyze - Analyzes YouTube video comments
router.post('/analyze', async (req, res) => {
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

    const sentiment = new Sentiment();

    // Process comments and perform sentiment analysis
    const comments = response.data.items.map((item) => {
      const comment = item.snippet.topLevelComment.snippet;
      const text = comment.textDisplay;

      // Perform sentiment analysis
      const result = sentiment.analyze(text);
      let sentimentCategory = 'neutral';

      // Classify sentiment into agree, disagree, or neutral
      if (result.score > 2) {
        sentimentCategory = 'agree';
      } else if (result.score < -2) {
        sentimentCategory = 'disagree';
      }

      return {
        videoLink,
        comment: text,
        maskedUsername: comment.authorDisplayName.replace(/./g, '*'),
        sentiment: sentimentCategory,
        createdAt: new Date(comment.publishedAt),
      };
    });

    // Prevent duplicate comments in the database
    const existingComments = await Comment.find({ videoLink });

    const newComments = comments.filter(
      (c) => !existingComments.some((ec) => ec.comment === c.comment)
    );

    if (newComments.length > 0) {
      await Comment.insertMany(newComments);
    }

    res.status(200).json({ message: 'Comments fetched, analyzed, and stored successfully', comments });
  } catch (error) {
    console.error(error); // Logs the full error
    res.status(500).json({ message: 'Error fetching comments', error: error.toString() });
  }
});

// GET /sentiment-summary - Aggregates sentiment data
router.get('/sentiment-summary', async (req, res) => {
  try {
    const sentimentData = await Comment.aggregate([
      {
        $group: {
          _id: '$sentiment', // Group by sentiment (agree, neutral, disagree)
          count: { $sum: 1 }, // Count the number of comments for each sentiment type
        },
      },
    ]);

    // Ensure all sentiments are included (agree, neutral, disagree) even if no comments match
    const sentimentSummary = {
      agree: 0,
      neutral: 0,
      disagree: 0,
    };

    sentimentData.forEach((item) => {
      if (item._id === 'agree') sentimentSummary.agree = item.count;
      else if (item._id === 'neutral') sentimentSummary.neutral = item.count;
      else if (item._id === 'disagree') sentimentSummary.disagree = item.count;
    });

    res.status(200).json(sentimentSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sentiment summary', error: error.toString() });
  }
});

module.exports = router;
