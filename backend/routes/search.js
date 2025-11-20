const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { protect } = require('../middleware/auth');

router.get('/basic', protect, searchController.basicSearch);
router.post('/advanced', protect, searchController.advancedSearch);
router.get('/by-id/:profileId', protect, searchController.searchById);
router.get('/recommendations', protect, searchController.getRecommendations);

module.exports = router;
