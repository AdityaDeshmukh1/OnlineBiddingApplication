// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true 
});

const port = process.env.PORT || 3000;


// Define a root route
app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', itemRoutes);
app.use('/api', bidRoutes);

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
