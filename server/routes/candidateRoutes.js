const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/authMiddleware');
const { getMyProfile, upsertMyProfile } = require('../controllers/candidateController');

router.get('/profile', protect, requireRole('candidate'), getMyProfile);
router.put('/profile', protect, requireRole('candidate'), upsertMyProfile);

module.exports = router;