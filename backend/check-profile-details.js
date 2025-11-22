const mongoose = require('mongoose');
require('dotenv').config();

const Profile = require('./models/Profile');

async function checkProfiles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const profiles = await Profile.find().populate('userId').lean();
    
    console.log(`📊 DETAILED PROFILE DATA:\n`);
    profiles.forEach((prof, idx) => {
      console.log(`\n${idx + 1}. Profile ID: ${prof.profileId}`);
      console.log(`   User Email: ${prof.userId?.email || 'N/A'}`);
      console.log(`   First Name: ${prof.basicInfo?.firstName || prof.firstName || 'MISSING'}`);
      console.log(`   Last Name: ${prof.basicInfo?.lastName || prof.lastName || 'MISSING'}`);
      console.log(`   Gender: ${prof.basicInfo?.gender || prof.gender || 'MISSING'}`);
      console.log(`   Age: ${prof.basicInfo?.age || prof.age || 'MISSING'}`);
      console.log(`   Has Photo: ${prof.photos?.profilePhoto ? 'Yes' : 'No'}`);
      console.log(`   Structure: `, Object.keys(prof));
    });

    await mongoose.disconnect();
    console.log('\n✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkProfiles();
