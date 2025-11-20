const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/create', protect, profileController.createProfile);
router.get('/my-profile', protect, profileController.getMyProfile);
router.put('/update', protect, profileController.updateProfile);
router.get('/:profileId', protect, profileController.getProfileById);
router.post('/upload-photo', protect, upload.single('photo'), profileController.uploadPhoto);
router.delete('/photo/:photoId', protect, profileController.deletePhoto);
router.post('/upload-document', protect, upload.single('document'), profileController.uploadDocument);
router.put('/privacy', protect, profileController.updatePrivacy);
router.get('/view/:profileId', protect, profileController.viewProfile);

module.exports = router;
