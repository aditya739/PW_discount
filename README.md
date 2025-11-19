# Physics Wallah Coupon Management System

A secure, full-stack web application for managing and distributing Physics Wallah coupon codes with admin dashboard, analytics, and mobile-responsive design.

## Features

✅ **Copy-to-Clipboard Functionality** - One-click coupon code copying with instant feedback
✅ **Admin Dashboard** - Manage coupons, banners, and view analytics
✅ **Dynamic Banners** - Schedule and display promotional banners
✅ **Coupon Filtering** - Filter by "New", "Expiring Soon", or all offers
✅ **Usage Tracking** - Track coupon redemptions and performance
✅ **Mobile Responsive** - Optimized for all screen sizes
✅ **Secure Authentication** - JWT-based admin authentication
✅ **Social Integration** - Links to community channels
✅ **Countdown Timers** - Display urgency for limited-time offers

## Project Structure

```
├── backend/
│   ├── models/
│   │   ├── Coupon.js
│   │   ├── Banner.js
│   │   ├── Admin.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── coupons.js
│   │   ├── banners.js
│   │   └── analytics.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CouponCard.js
│   │   │   ├── BannerCarousel.js
│   │   │   └── SocialLinks.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── AdminLogin.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Setup Instructions

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```
   MONGODB_URI=mongodb://localhost:27017/coupon-db
   JWT_SECRET=your-super-secret-key-change-this
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=secure-password-here
   FRONTEND_URL=http://localhost:3000
   ```

5. **Ensure MongoDB is running** (local or Atlas connection)

6. **Start the backend server:**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend development server:**
   ```bash
   npm start
   ```
   App runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/verify` - Verify token (protected)

### Coupons (Public)
- `GET /api/coupons` - Get all active coupons
- `POST /api/coupons/validate` - Validate coupon code

### Coupons (Admin)
- `POST /api/coupons` - Create coupon (protected)
- `PUT /api/coupons/:id` - Update coupon (protected)
- `DELETE /api/coupons/:id` - Delete coupon (protected)

### Banners (Public)
- `GET /api/banners` - Get active banners

### Banners (Admin)
- `POST /api/banners` - Create banner (protected)
- `PUT /api/banners/:id` - Update banner (protected)
- `DELETE /api/banners/:id` - Delete banner (protected)

### Analytics (Admin)
- `POST /api/analytics/track` - Track coupon redemption
- `GET /api/analytics` - Get all analytics (protected)
- `GET /api/analytics/performance/:couponId` - Get coupon performance (protected)

## Security Features

🔒 **JWT Authentication** - Secure token-based admin access
🔒 **Password Hashing** - Bcrypt for secure password storage
🔒 **Input Validation** - Express-validator for all inputs
🔒 **Rate Limiting** - Prevent abuse with request rate limiting
🔒 **CORS Protection** - Configured CORS for frontend-backend communication
🔒 **Environment Variables** - Sensitive data stored in .env files
🔒 **Protected Routes** - Admin routes require valid JWT token

## Usage Guide

### For Students (Public)

1. Visit the homepage to see all active offers
2. Click "Copy Code" button next to any coupon
3. Open Physics Wallah app
4. Paste the code at checkout
5. Enjoy the discount!

### For Admins

1. Navigate to `/admin/login`
2. Login with admin credentials
3. Access dashboard to:
   - Create/edit/delete coupons
   - Manage banners and scheduling
   - View redemption analytics
   - Track coupon performance

## Database Schema

### Coupon
```javascript
{
  code: String (unique),
  discount: Number,
  discountType: String (percentage/fixed),
  courses: [ObjectId],
  startDate: Date,
  endDate: Date,
  totalUsageLimit: Number,
  usagePerUser: Number,
  currentUsage: Number,
  isActive: Boolean,
  description: String,
  createdAt: Date
}
```

### Banner
```javascript
{
  title: String,
  imageUrl: String,
  couponCode: ObjectId (ref: Coupon),
  startDate: Date,
  endDate: Date,
  placement: String (hero/sticky/sidebar),
  isActive: Boolean,
  createdAt: Date
}
```

### Analytics
```javascript
{
  couponCode: ObjectId (ref: Coupon),
  courseId: String,
  userId: String,
  redemptionDate: Date,
  discountAmount: Number,
  status: String (redeemed/failed)
}
```

## Performance Optimization

- Lazy loading for banners
- Optimized CSS with mobile-first approach
- Efficient database queries with indexing
- Rate limiting to prevent abuse
- Minimal bundle size with React

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Backend won't start:**
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify .env file configuration

**Frontend won't connect to backend:**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env
- Verify CORS settings in backend

**Coupons not showing:**
- Check if coupons are within active date range
- Verify isActive flag is true
- Check browser console for API errors

## Future Enhancements

- Deep linking to Physics Wallah app
- Email notifications for new offers
- SMS alerts for expiring coupons
- Advanced analytics dashboard
- Multi-language support
- Payment gateway integration

## License

Proprietary - Physics Wallah

## Support

For issues or questions, contact the development team.
