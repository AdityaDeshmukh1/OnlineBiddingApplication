// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/users', userController.getAllUsers);

// GET a specific user by ID
router.get('/users/:id', userController.getUserById);

// POST create a new user
router.post('/users', userController.createUser);

// PUT update a user's information
router.put('/users/:id', userController.updateUser);

// DELETE remove a user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
