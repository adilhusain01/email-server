const Template = require('../models/Template');

exports.createTemplate = async (req, res) => {
  try {
    const template = new Template({
      ...req.body,
      userId: 1,
    });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ userId: 1 });
    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json({ message: 'Template deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
