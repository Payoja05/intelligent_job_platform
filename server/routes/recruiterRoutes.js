const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/authMiddleware');
const { getMyProfile, upsertMyProfile } = require('../controllers/recruiterController');

router.get('/profile', protect, requireRole('recruiter'), getMyProfile);
router.put('/profile', protect, requireRole('recruiter'), upsertMyProfile);

module.exports = router;