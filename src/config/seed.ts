import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel';
import Content from './models/contentModel';
import bcrypt from 'bcryptjs';

dotenv.config(); // Load environment variables

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Content.deleteMany({});

    // Sample Users
    const users = await User.insertMany([
      {
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', 10), // Hash the password
        username: 'user1',
      },
      {
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', 10),
        username: 'user2',
      },
    ]);

    console.log('Users seeded');

    // Sample Content
    const content = await Content.insertMany([
      {
        title: 'Sample Game',
        description: 'This is a sample game.',
        category: 'game',
        thumbnail_url: 'https://example.com/thumbnail1.jpg',
        content_url: 'https://example.com/game1',
      },
      {
        title: 'Sample Video',
        description: 'This is a sample video.',
        category: 'video',
        thumbnail_url: 'https://example.com/thumbnail2.jpg',
        content_url: 'https://example.com/video1',
      },
    ]);

    console.log('Content seeded');

    process.exit();
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

// Run the seeding script
(async () => {
  await connectDB();
  await seedData();
})();

