const Campaign = require('../models/Campaign');
const Template = require('../models/Template');
const List = require('../models/List');
const sesClient = require('../config/ses');
const { SendEmailCommand } = require('@aws-sdk/client-ses');

async function sendBulkEmail(campaign, template, subscribers) {
  const trackingPixelUrl = `http://localhost:3000/api/tracking/open/${campaign._id}/671de9fb0ffda76e1acd1d95`;
  const htmlContentWithTracking = `<img src="${trackingPixelUrl}" width="1" height="1" style="display:none;" />${template.htmlContent}`;

  const params = {
    Source: process.env.VERIFIED_EMAIL,
    Destination: {
      ToAddresses: subscribers.map((sub) => sub.email),
    },
    Message: {
      Subject: {
        Data: template.subject,
      },
      Body: {
        Html: {
          Data: htmlContentWithTracking,
        },
        Text: {
          Data: template.plainTextContent,
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

exports.createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      userId: 1,
    });
    await campaign.save();

    if (req.body.sendNow) {
      const template = await Template.findById(campaign.templateId);
      const list = await List.findById(campaign.emailListId);

      const activeSubscribers = list.subscribers.filter(
        (sub) => !sub.unsubscribed
      );

      await sendBulkEmail(campaign, template, activeSubscribers);
      campaign.status = 'completed';
      await campaign.save();
    }

    res.status(201).json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: 1 });
    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
