const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const PORT = 5000;
const MONGO_DB_CONNECTION_STRING = "mongodb+srv://user:password@cluster.projec.mongodb.net/?retryWrites=true&w=majority&appName=demo";

// Connect to MongoDB
mongoose.connect(MONGO_DB_CONNECTION_STRING)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import Item model
const Item = require('./models/item');

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method')); // For handling PUT and DELETE requests

// Routes
// Display all items and the form
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render('index', { items, item: { name: '', description: '' }, editing: false });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add a new item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description
    });
    await newItem.save();
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error adding item');
  }
});

// Edit an item
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    const items = await Item.find().sort({ createdAt: -1 });
    res.render('index', { 
      items: items, 
      item: item, 
      editing: true 
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error fetching item');
  }
});

// Update an item
app.put('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description
    });
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating item');
  }
});

// Delete an item
app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});