const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the integrated directory
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// MongoDB connection
mongoose.connect("mongodb+srv://sri09soumya:soumya123@cluster0.42yvcgv.mongodb.net/"
 , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    role: { type: String, default: 'Customer' },
    location: String,
    phone: String,
    cart: [{
        item: String,
        cost: Number
    }]
});

const User = mongoose.model('User', userSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Routes
app.post('/register', async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: 'Email or username already exists' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            username,
            password: hashedPassword
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                joined: user.joined
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/auth', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                joined: user.joined
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Protected routes
app.get('/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

app.put('/user/profile/update', authenticateToken, async (req, res) => {
    try {
        const { name, email, phone, location } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, email, phone, location },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
});

app.put('/user/password/update', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId);

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password' });
    }
});

// Cart management
// app.get('/cart', authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         res.json({ items: user.cart });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching cart' });
//     }
// });

app.get('/cart/checkout', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const total = user.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        res.json({ 
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location
            },
            cart: user.cart,
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching checkout data' });
    }
});

app.post('/cart/add', authenticateToken, async (req, res) => {
    try {
        const { item, cost } = req.body;
        const user = await User.findById(req.user.userId);
        
        // Check if item already exists in cart
        const existingItem = user.cart.find(cartItem => cartItem.item === item);
        if (existingItem) {
            return res.status(400).json({ message: 'Item already in cart' });
        }

        // Add new item to cart
        user.cart.push({ item, cost });
        await user.save();

        res.json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});

app.post('/cart/remove', authenticateToken, async (req, res) => {
    try {
        const { item } = req.body;
        const user = await User.findById(req.user.userId);
        
        // Remove item from cart
        user.cart = user.cart.filter(cartItem => cartItem.item !== item);
        await user.save();

        res.json({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart' });
    }
});

// app.get('/cart/checkout', authenticateToken, async (req, res) => {
//     try {
//         // Find user with populated cart
//         const user = await User.findById(req.user.userId);
//         console.log('User found:', user); // Debug log

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Calculate total
//         const total = user.cart.reduce((sum, item) => sum + (item.cost || 0), 0);

//         // Send response with all necessary data
//         const response = {
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone || 'Not provided',
//                 location: user.location || 'Not provided',
//                 role: user.role,
//                 joined: user.joined
//             },
//             cart: user.cart,
//             total: total
//         };

//         console.log('Sending response:', response); // Debug log
//         res.json(response);

//     } catch (error) {
//         console.error('Checkout error:', error);
//         res.status(500).json({ message: 'Error processing checkout' });
//     }
// });

// Update the checkout function in script_goa.js
async function checkout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        // Add each item to the server cart
        for (const item of cartItems) {
            await fetch('http://localhost:3000/cart/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item: item.item,
                    cost: item.cost
                })
            });
        }

        // Redirect to billing page
        window.location.href = 'billing.html';
        
    } catch (error) {
        console.error('Checkout error:', error);
        showNotification('Failed to checkout. Please try again.');
    }
}

// Add a test endpoint to verify database connection
app.get('/test-db', async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ message: 'Database connected', userCount: count });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 

app.post('/verify-upi-payment', authenticateToken, async (req, res) => {
    try {
        // In a real app, verify with payment gateway
        const { transactionId } = req.body;
        
        // Simulate successful verification
        res.json({ 
            success: true,
            message: 'Thank You for Choosing Us',
            amount: req.body.amount
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
});
