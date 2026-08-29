const CandidateProfile = require('../models/CandidateProfile');

// @route GET /api/candidate/profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await CandidateProfile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route PUT /api/candidate/profile
exports.upsertMyProfile = async (req, res) => {
  try {
    const { headline, bio, location, skills, experienceYears, education } = req.body;

    const profile = await CandidateProfile.findOneAndUpdate(
      { user: req.userId },
      { headline, bio, location, skills, experienceYears, education, user: req.userId },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};