const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
  emailListId: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sending', 'completed'],
    default: 'draft',
  },
  scheduledDate: Date,
  statistics: {
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    clicked: { type: Number, default: 0 },
    bounced: { type: Number, default: 0 },
    complaints: { type: Number, default: 0 },
  },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Campaign', campaignSchema);
