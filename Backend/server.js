const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001',
  'http://localhost:5173',
  'https://pw-discount.vercel.app',
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(url => url.trim()) : [])
];

console.log('Allowed CORS origins:', allowedOrigins);

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting - More lenient for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per window
  message: 'Too many requests, please try again later',
  skip: (req) => req.method === 'GET' // Don't rate limit GET requests
});
app.use('/api/', limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/coupons', require('./routes/coupons'));
app.use('/api/banners', require('./routes/banners'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/hero-images', require('./routes/heroImages'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/main-divs', require('./routes/mainDivs'));
app.use('/api/course-categories', require('./routes/courseCategories'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
