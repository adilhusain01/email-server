const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  customFields: Object,
  subscribeDate: { type: Date, default: Date.now },
  unsubscribed: { type: Boolean, default: false },
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subscribers: [subscriberSchema],
  userId: { type: String, required: true },
});

module.exports = mongoose.model('List', listSchema);
