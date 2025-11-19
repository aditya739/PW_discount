const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Coupon = require('./models/Coupon');
const Banner = require('./models/Banner');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

const seedBanners = async () => {
  try {
    const coupons = await Coupon.find();
    if (coupons.length === 0) {
      console.error('❌ No coupons found. Run seed.js first');
      process.exit(1);
    }

    await Banner.deleteMany({});
    
    const banners = [
      {
        title: 'CPCA0300 - 30% OFF',
        imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fvia.placeholder.com%2F1200x400%2F003d99%2FFFFFFF%3Ftext%3DCPCA0300%2B-%2B30%25%2BOFF%2BPhysics%2BWallah',
        couponCode: coupons[0]._id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        placement: 'hero',
        isActive: true
      }
    ];

    await Banner.insertMany(banners);
    console.log('✅ Banner seed data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedBanners();
