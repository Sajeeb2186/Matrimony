const mongoose = require('mongoose');
require('dotenv').config();

async function showProfile() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    const profile = await db.collection('profiles').findOne({ profileId: 'MAT010001' });
    
    console.log('📋 FULL PROFILE STRUCTURE:\n');
    console.log(JSON.stringify(profile, null, 2));

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

showProfile();
