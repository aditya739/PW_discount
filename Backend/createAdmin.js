const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

const createAdmin = async () => {
  try {
    await Admin.deleteMany({});
    
    const admin = new Admin({
      email: 'admin@example.com',
      password: 'admin123456',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin created successfully');
    console.log('📧 Email: admin@example.com');
    console.log('🔐 Password: admin123456');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

createAdmin();
