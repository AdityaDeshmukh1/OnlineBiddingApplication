// routes/bidRoutes.js
const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');

// GET all bids
router.get('/bids', bidController.getAllBids);

// GET a specific bid by ID
router.get('/bids/:id', bidController.getBidById);

// POST create a new bid
router.post('/bids', bidController.createBid);

// PUT update a bid's information
router.put('/bids/:id', bidController.updateBid);

// DELETE remove a bid
router.delete('/bids/:id', bidController.deleteBid);

module.exports = router;
