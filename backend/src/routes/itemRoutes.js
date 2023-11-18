// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// GET all items
router.get('/items', itemController.getAllItems);

// GET a specific item by ID
router.get('/items/:id', itemController.getItemById);

// POST create a new item
router.post('/items', itemController.createItem);

// PUT update an item's information
router.put('/items/:id', itemController.updateItem);

// DELETE remove an item
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
