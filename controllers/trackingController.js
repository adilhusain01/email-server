const Campaign = require('../models/Campaign');

exports.trackOpen = async (req, res) => {
  try {
    console.log(req.params);

    const campaign = await Campaign.findById(req.params.campaignId);

    if (campaign) {
      campaign.statistics.opened += 1;
      await campaign.save();
    }

    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': '43',
    });
    res.end(
      Buffer.from(
        'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        'base64'
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.trackClick = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.campaignId);
    if (campaign) {
      campaign.statistics.clicked += 1;
      await campaign.save();
    }
    res.redirect(req.body.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
