const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('./models/Profile');

async function testVirtuals() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Without lean - virtuals should work
    const profile = await Profile.findOne({ profileId: 'MAT010001' });
    
    console.log('📋 PROFILE WITH VIRTUALS:\n');
    console.log(`Profile ID: ${profile.profileId}`);
    console.log(`First Name: ${profile.firstName}`);
    console.log(`Last Name: ${profile.lastName}`);
    console.log(`Gender: ${profile.gender}`);
    console.log(`Age: ${profile.age}`);
    console.log(`Education: ${profile.education}`);
    console.log(`Occupation: ${profile.occupation}`);
    console.log(`City: ${profile.city}`);
    console.log(`Profile Photo: ${profile.profilePhoto}`);
    console.log(`Height: ${profile.height}`);
    
    // Convert to JSON to see all fields
    console.log('\n📋 AS JSON:');
    const json = profile.toJSON();
    console.log(`First Name: ${json.firstName}`);
    console.log(`Last Name: ${json.lastName}`);
    console.log(`Gender: ${json.gender}`);

    await mongoose.disconnect();
    console.log('\n✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testVirtuals();
