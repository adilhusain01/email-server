const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');

router.get(
  '/tracking/open/:campaignId/:subscriberId',
  trackingController.trackOpen
);
router.post(
  '/tracking/click/:campaignId/:subscriberId/:linkId',
  trackingController.trackClick
);

module.exports = router;
