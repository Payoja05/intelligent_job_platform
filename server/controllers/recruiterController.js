const RecruiterProfile = require('../models/RecruiterProfile');

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.upsertMyProfile = async (req, res) => {
  try {
    const { companyName, companyDescription, website, industry, location } = req.body;

    if (!companyName) {
      return res.status(400).json({ message: 'Company name is required' });
    }

    const profile = await RecruiterProfile.findOneAndUpdate(
      { user: req.userId },
      { companyName, companyDescription, website, industry, location, user: req.userId },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};