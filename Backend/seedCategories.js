const mongoose = require('mongoose');
const CourseCategory = require('./models/CourseCategory');
require('dotenv').config();

const categories = [
  { name: 'SCHOOL_PREPARATION', discountText: '5% upto 50', applicableCode: 'CPCA0300' },
  { name: 'Humanities', discountText: '10% upto 200', applicableCode: 'CPCA0300' },
  { name: 'ACCA', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'DESIGN', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'PHARMA', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'CUET_PG', discountText: '4% upto 300', applicableCode: 'CPCA0300' },
  { name: 'IELTS', discountText: '10% upto 500', applicableCode: 'CPCA0300' },
  { name: 'BFSI', discountText: '10% upto 2000', applicableCode: 'CPCA0300' },
  { name: 'UGC NET', discountText: '4% upto 300', applicableCode: 'CPCA0300' },
  { name: 'MBA, MBA GMAT', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'CLAT', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'IPMAT', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'IIT JAM', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'CSIR NET', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'CS', discountText: '5% upto 500', applicableCode: 'CPCA0300' },
  { name: 'COMMERCE', discountText: '5% upto 500', applicableCode: 'CPCA0300' },
  { name: 'CA', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'IIT-JEE', discountText: '2% upto 150', applicableCode: 'CPCA0300' },
  { name: 'NEET', discountText: '2% upto 150', applicableCode: 'CPCA0300' },
  { name: 'NDA', discountText: '3% upto 50', applicableCode: 'CPCA0300' },
  { name: 'ARCHITECTURE', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'AGRICULTURE', discountText: '5% upto 500', applicableCode: 'CPCA0300' },
  { name: 'OPSC', discountText: '10% upto 1500', applicableCode: 'CPCA0300' },
  { name: 'skills', discountText: '10% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'Railway', discountText: '10% upto 120', applicableCode: 'CPCA0300' },
  { name: 'Accounting Courses', discountText: '10% upto 2000', applicableCode: 'CPCA0300' },
  { name: 'Bihar Exams', discountText: '10% upto 50', applicableCode: 'CPCA0300' },
  { name: 'UP Exams', discountText: '10% upto 50', applicableCode: 'CPCA0300' },
  { name: 'JAIIB AND CAIIB', discountText: '10% upto 200', applicableCode: 'CPCA0300' },
  { name: 'TEACHER_TRAINING', discountText: '10% upto 120', applicableCode: 'CPCA0300' },
  { name: 'Banking', discountText: '10% upto 750', applicableCode: 'CPCA0300' },
  { name: 'SSC', discountText: '10% upto 120', applicableCode: 'CPCA0300' },
  { name: 'AE/JE', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'ESE + GATE', discountText: '5% upto 1000', applicableCode: 'CPCA0300' },
  { name: 'Judiciary', discountText: '10% upto 1500', applicableCode: 'CPCA0300' },
  { name: 'HPPSC', discountText: '10% upto 1500', applicableCode: 'CPCA0300' },
  { name: 'HPSC', discountText: '10% upto 1500', applicableCode: 'CPCA0300' },
  { name: 'WBPSC', discountText: '10% upto 1500', applicableCode: 'CPCA0300' },
  { name: 'BPSC', discountText: '10% upto 1500', applicableCode: 'CPCA0300' },
  { name: 'CUET UG', discountText: '2% upto 150', applicableCode: 'CPCA0300' },
  { name: 'CA_OFFLINE', discountText: '2% upto 2', applicableCode: 'CPCA0300' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await CourseCategory.deleteMany({});
    console.log('Cleared existing categories');

    await CourseCategory.insertMany(categories);
    console.log('Seeded categories');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
