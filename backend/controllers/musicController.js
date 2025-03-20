import Music from "../models/Music.js";

// @desc    Get all music with category details
// @route   GET /api/music
// @access  Public
const getMusic = async (req, res) => {
  try {
    const musicList = await Music.find().populate("category", "name description");
    res.json(musicList);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const createMusic = asyncHandler(async (req, res) => {
  const { title, artist, category, url } = req.body;

  if (!title || !artist || !category || !url) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const music = await Music.create({
    title,
    artist,
    category,
    url,
    user: req.user._id, // Store who uploaded the music
  });

  if (music) {
    res.status(201).json(music);
  } else {
    res.status(400);
    throw new Error('Invalid music data');
  }
});


export { getMusic, createMusic };