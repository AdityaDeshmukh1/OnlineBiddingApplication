// controllers/bidController.js
const Bid = require('../models/Bid');
const Item = require('../models/Item');

// GET all bids
const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.json(bids);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// GET a specific bid by ID
const getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).send('Bid not found');
    }
    res.json(bid);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// POST create a new bid
const createBid = async (req, res) => {
  try {
    const { amount, itemId, bidderId } = req.body;

    // Check if the item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }

    // Check if the bid amount is greater than the current price
    if (amount <= item.currentPrice) {
      return res.status(400).send('Bid amount must be greater than the current price');
    }

    // Create a new bid
    const newBid = await Bid.create({ amount, item: itemId, bidder: bidderId });

    // Update the current price of the item
    await Item.findByIdAndUpdate(itemId, { currentPrice: amount });

    res.status(201).json(newBid);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// PUT update a bid's information
const updateBid = async (req, res) => {
  try {
    const updatedBid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBid) {
      return res.status(404).send('Bid not found');
    }
    res.json(updatedBid);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// DELETE remove a bid
const deleteBid = async (req, res) => {
  try {
    const deletedBid = await Bid.findByIdAndRemove(req.params.id);
    if (!deletedBid) {
      return res.status(404).send('Bid not found');
    }
    res.json(deletedBid);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllBids,
  getBidById,
  createBid,
  updateBid,
  deleteBid,
};
