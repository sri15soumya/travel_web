const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve files from integrated directory

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/scroll_db', {
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
        itemId: String,
        name: String,
        price: Number,
        quantity: Number
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

// Protected routes
app.get('/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
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
app.get('/cart', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const total = user.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        res.json({ items: user.cart, total });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart' });
    }
});

// app.get('/cart/checkout', authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         const total = user.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
//         res.json({ 
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 location: user.location
//             },
//             cart: user.cart,
//             total
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching checkout data' });
//     }
// });

app.post('/cart/add', authenticateToken, async (req, res) => {
    try {
        const { itemId, name, price, quantity } = req.body;
        const user = await User.findById(req.user.userId);

        const existingItem = user.cart.find(item => item.itemId === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ itemId, name, price, quantity });
        }

        await user.save();
        res.json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});

app.post('/cart/clear', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.cart = [];
        await user.save();
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 