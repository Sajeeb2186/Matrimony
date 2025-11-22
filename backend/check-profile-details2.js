const mongoose = require('mongoose');
require('dotenv').config();

async function checkProfiles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Direct query without models
    const db = mongoose.connection.db;
    const profilesCollection = db.collection('profiles');
    
    const profiles = await profilesCollection.find({}).toArray();
    
    console.log(`📊 TOTAL PROFILES: ${profiles.length}\n`);
    
    profiles.forEach((prof, idx) => {
      console.log(`\n${idx + 1}. Profile ID: ${prof.profileId || 'N/A'}`);
      console.log(`   User ID: ${prof.userId || 'N/A'}`);
      console.log(`   First Name: ${prof.firstName || prof.basicInfo?.firstName || 'MISSING'}`);
      console.log(`   Last Name: ${prof.lastName || prof.basicInfo?.lastName || 'MISSING'}`);
      console.log(`   Gender: ${prof.gender || prof.basicInfo?.gender || 'MISSING'}`);
      console.log(`   DOB: ${prof.dateOfBirth || prof.basicInfo?.dateOfBirth || 'MISSING'}`);
      console.log(`   Photo: ${prof.profilePhoto || prof.photos?.profilePhoto || 'MISSING'}`);
      console.log(`   Keys in document:`, Object.keys(prof).join(', '));
    });

    await mongoose.disconnect();
    console.log('\n✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkProfiles();
