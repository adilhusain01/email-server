const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/lists', listController.getLists);
router.post('/lists', listController.createList);
router.get('/lists/:id', listController.getList);
router.put('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);
router.post('/lists/:listId/subscribers', listController.addSubscriber);

module.exports = router;
