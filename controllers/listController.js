const List = require('../models/List');

exports.createList = async (req, res) => {
  try {
    const list = new List({
      ...req.body,
      userId: 1,
    });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.addSubscriber = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    list.subscribers.push(req.body);
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: 1 });
    res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateList = async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.json({ message: 'List deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
