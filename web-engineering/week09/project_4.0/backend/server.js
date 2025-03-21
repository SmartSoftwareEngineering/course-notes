const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose
  .connect('mongodb+srv://user:pass@server.mongodb.net/?retryWrites=true&w=majority&appName=demo')
  .then(() => console.log("Monngodb Connected"))
  .catch(err => console.log(err))

const Item = require('./models/item');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Get All Items
app.get('/api/v1/items', async function (req, res) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.send(JSON.stringify(items));
  } catch (error) {
    res.status(500).send('{ "status": "ERROR", "message": "Failed to fetch Items. Please try again shortly"}')
  }
  
})

// Get a specific item by ID
app.get('/api/v1/items/:id', async function (req, res) {
  try {
    const item = await Item.findById(req.params.id);
    res.send(JSON.stringify(item))
  } catch (error) {
    res.status(400).send('{ "status": "ERROR", "message": "Failed to fetch Item. Please check item id and try again"}')
  }
  
})

// Create a new items
app.post('/api/v1/items', async function (req, res) {
  console.log(req.body);
  try {
    const newItem = new Item({
      name: req.body.name,
      company: req.body.company,
      description: req.body.description
    });
    savedItem = await newItem.save();
    res.send(JSON.stringify({
      status: "OK",
      message: "Item record successfully saved",
      item: savedItem
    }))
  } catch (err) {
    res.status(400).send('{ "status": "ERROR", "message": "Item record was not saved. Please check values and try again"}')

  }
})

// Update an item based on Id
app.put('/api/v1/items/:id', async (req, res) => {
  try {
    updateditem = await Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      company: req.body.company,
      description: req.body.description
    });
    res.send(JSON.stringify({
      status: "OK",
      message: "Item record successfully updated",
      item: updateditem
    }))
  } catch (err) {
    console.error(err);
    res.status(400).send('{ "status": "ERROR", "message": "Item record was not saved. Please check values and try again"}')
  }
});

// Delete an item based on ID
app.delete('/api/v1/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.send(JSON.stringify({
      status: "OK",
      message: "Item record successfully deleted",
    }))
  } catch (err) {
    console.error(err);
    res.status(500).send('{ "status": "ERROR", "message": "Error Deleting Items"}')
  }
});


app.listen(5000, () => {
  console.log('Server started')
})
