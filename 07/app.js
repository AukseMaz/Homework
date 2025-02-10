// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory array to store cart items
let cartItems = [];

// Create a new cart item
app.post('/cart', (req, res) => {
    const { productId, productName, quantity, price } = req.body;
    const newItem = {
        id: cartItems.length + 1,
        productId,
        productName,
        quantity,
        price
    };
    cartItems.push(newItem);
    res.status(201).json(newItem);
});

// Read all cart items
app.get('/cart', (req, res) => {
    res.status(200).json(cartItems);
});

// Read a single cart item by ID
app.get('/cart/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const item = cartItems.find(i => i.id === itemId);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
});

// Update a cart item by ID
app.put('/cart/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const index = cartItems.findIndex(i => i.id === itemId);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const { productId, productName, quantity, price } = req.body;
    cartItems[index] = {
        ...cartItems[index],
        productId,
        productName,
        quantity,
        price
    };
    res.status(200).json(cartItems[index]);
});

// Delete a cart item by ID
app.delete('/cart/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const index = cartItems.findIndex(i => i.id === itemId);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    
    cartItems.splice(index, 1);
    res.status(204).send(); // No content to send back
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
