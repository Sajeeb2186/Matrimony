const mongoose = require('mongoose');
require('dotenv').config();

const Interaction = require('./models/Interaction');
const Profile = require('./models/Profile');
const User = require('./models/User');

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check interactions
    const interactions = await Interaction.find().populate('fromUserId toUserId');
    console.log(`📊 INTERACTIONS: ${interactions.length} documents`);
    interactions.forEach((int, idx) => {
      console.log(`${idx + 1}. Type: ${int.interactionType}, From: ${int.fromUserId?.email}, To: ${int.toUserId?.email}, Status: ${int.status}`);
    });
    console.log('');

    // Check profiles
    const profiles = await Profile.find().populate('userId');
    console.log(`📊 PROFILES: ${profiles.length} documents`);
    profiles.forEach((prof, idx) => {
      console.log(`${idx + 1}. ${prof.profileId} - ${prof.firstName} ${prof.lastName} (${prof.userId?.email})`);
    });
    console.log('');

    // Check users
    const users = await User.find();
    console.log(`📊 USERS: ${users.length} documents`);
    users.forEach((user, idx) => {
      console.log(`${idx + 1}. ${user.email} - ${user.role}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkData();
