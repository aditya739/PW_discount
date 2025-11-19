const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Coupon = require('./models/Coupon');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

const seedCoupons = async () => {
  try {
    await Coupon.deleteMany({});
    
    const coupons = [
      {
        code: 'CPCA0300',
        discount: 30,
        discountType: 'percentage',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        totalUsageLimit: 500,
        usagePerUser: 1,
        currentUsage: 0,
        isActive: true,
        description: 'Physics Wallah Mega Sale - 30% OFF'
      }
    ];

    await Coupon.insertMany(coupons);
    console.log('✅ Seed data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedCoupons();
