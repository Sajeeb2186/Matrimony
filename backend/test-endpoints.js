/**
 * Backend API Endpoint Test Script
 * This script tests all major API endpoints to ensure they're working
 */

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = '';
let testProfileId = '';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function log(message, type = 'info') {
  const colorMap = {
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue
  };
  console.log(`${colorMap[type]}${message}${colors.reset}`);
}

async function testEndpoint(name, fn) {
  try {
    log(`\n📍 Testing: ${name}`, 'info');
    await fn();
    log(`✅ PASSED: ${name}`, 'success');
    return true;
  } catch (error) {
    log(`❌ FAILED: ${name}`, 'error');
    if (error.response) {
      log(`   Status: ${error.response.status}`, 'error');
      log(`   Message: ${error.response.data.message || JSON.stringify(error.response.data)}`, 'error');
    } else {
      log(`   Error: ${error.message}`, 'error');
    }
    return false;
  }
}

// Test Functions
async function testAuth() {
  // Login with existing user
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: 'admin@matrimony.com',
    password: 'Admin@123'
  });
  
  authToken = response.data.token;
  log(`   Token obtained: ${authToken.substring(0, 20)}...`, 'success');
}

async function testGetMyProfile() {
  const response = await axios.get(`${API_URL}/profile/me`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  if (response.data.success && response.data.data) {
    testProfileId = response.data.data.profileId;
    log(`   Profile ID: ${testProfileId}`, 'success');
  }
}

async function testGetAllProfiles() {
  const response = await axios.get(`${API_URL}/dev/profiles`);
  log(`   Found ${response.data.data?.length || 0} profiles`, 'success');
}

async function testSendInterest() {
  // Get a profile to send interest to
  const profiles = await axios.get(`${API_URL}/dev/profiles`);
  const targetProfile = profiles.data.data.find(p => p.profileId !== testProfileId);
  
  if (!targetProfile) {
    log('   No other profiles to send interest to', 'warning');
    return;
  }
  
  const response = await axios.post(
    `${API_URL}/interaction/interest/${targetProfile.profileId}`,
    { message: 'Hi, I am interested in your profile!' },
    { headers: { Authorization: `Bearer ${authToken}` } }
  );
  
  log(`   Interest sent to ${targetProfile.profileId}`, 'success');
}

async function testGetSentInterests() {
  const response = await axios.get(`${API_URL}/interaction/interests/sent`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  log(`   Sent interests: ${response.data.data?.length || 0}`, 'success');
}

async function testGetReceivedInterests() {
  const response = await axios.get(`${API_URL}/interaction/interests/received`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  log(`   Received interests: ${response.data.data?.length || 0}`, 'success');
}

async function testAddToShortlist() {
  const profiles = await axios.get(`${API_URL}/dev/profiles`);
  const targetProfile = profiles.data.data.find(p => p.profileId !== testProfileId);
  
  if (!targetProfile) {
    log('   No other profiles to shortlist', 'warning');
    return;
  }
  
  await axios.post(
    `${API_URL}/interaction/shortlist/${targetProfile.profileId}`,
    {},
    { headers: { Authorization: `Bearer ${authToken}` } }
  );
  
  log(`   Added ${targetProfile.profileId} to shortlist`, 'success');
}

async function testGetShortlists() {
  const response = await axios.get(`${API_URL}/interaction/shortlists`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  log(`   Shortlists: ${response.data.data?.length || 0}`, 'success');
}

async function testAddToFavorites() {
  const profiles = await axios.get(`${API_URL}/dev/profiles`);
  const targetProfile = profiles.data.data.find(p => p.profileId !== testProfileId);
  
  if (!targetProfile) {
    log('   No other profiles to favorite', 'warning');
    return;
  }
  
  await axios.post(
    `${API_URL}/interaction/favorite/${targetProfile.profileId}`,
    {},
    { headers: { Authorization: `Bearer ${authToken}` } }
  );
  
  log(`   Added ${targetProfile.profileId} to favorites`, 'success');
}

async function testGetFavorites() {
  const response = await axios.get(`${API_URL}/interaction/favorites`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  log(`   Favorites: ${response.data.data?.length || 0}`, 'success');
}

async function testGetMatchSuggestions() {
  const response = await axios.get(`${API_URL}/match/suggestions`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  log(`   Match suggestions: ${response.data.data?.length || 0}`, 'success');
}

async function testSearch() {
  const response = await axios.get(`${API_URL}/search/profiles?gender=female`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  log(`   Search results: ${response.data.data?.length || 0}`, 'success');
}

async function testGetConversations() {
  const response = await axios.get(`${API_URL}/chat/conversations`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  
  log(`   Conversations: ${response.data.data?.length || 0}`, 'success');
}

// Main Test Runner
async function runAllTests() {
  log('\n🚀 Starting API Endpoint Tests...', 'info');
  log('='.repeat(50), 'info');
  
  const results = {
    passed: 0,
    failed: 0
  };
  
  // Authentication Tests
  log('\n📁 AUTHENTICATION TESTS', 'info');
  if (await testEndpoint('Login', testAuth)) results.passed++; else results.failed++;
  
  // Profile Tests
  log('\n📁 PROFILE TESTS', 'info');
  if (await testEndpoint('Get My Profile', testGetMyProfile)) results.passed++; else results.failed++;
  if (await testEndpoint('Get All Profiles', testGetAllProfiles)) results.passed++; else results.failed++;
  
  // Interaction Tests
  log('\n📁 INTERACTION TESTS', 'info');
  if (await testEndpoint('Send Interest', testSendInterest)) results.passed++; else results.failed++;
  if (await testEndpoint('Get Sent Interests', testGetSentInterests)) results.passed++; else results.failed++;
  if (await testEndpoint('Get Received Interests', testGetReceivedInterests)) results.passed++; else results.failed++;
  if (await testEndpoint('Add to Shortlist', testAddToShortlist)) results.passed++; else results.failed++;
  if (await testEndpoint('Get Shortlists', testGetShortlists)) results.passed++; else results.failed++;
  if (await testEndpoint('Add to Favorites', testAddToFavorites)) results.passed++; else results.failed++;
  if (await testEndpoint('Get Favorites', testGetFavorites)) results.passed++; else results.failed++;
  
  // Match Tests
  log('\n📁 MATCH TESTS', 'info');
  if (await testEndpoint('Get Match Suggestions', testGetMatchSuggestions)) results.passed++; else results.failed++;
  
  // Search Tests
  log('\n📁 SEARCH TESTS', 'info');
  if (await testEndpoint('Search Profiles', testSearch)) results.passed++; else results.failed++;
  
  // Chat Tests
  log('\n📁 CHAT TESTS', 'info');
  if (await testEndpoint('Get Conversations', testGetConversations)) results.passed++; else results.failed++;
  
  // Summary
  log('\n' + '='.repeat(50), 'info');
  log('📊 TEST SUMMARY', 'info');
  log('='.repeat(50), 'info');
  log(`✅ Passed: ${results.passed}`, 'success');
  log(`❌ Failed: ${results.failed}`, results.failed > 0 ? 'error' : 'success');
  log(`📈 Total:  ${results.passed + results.failed}`, 'info');
  
  const successRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(2);
  log(`🎯 Success Rate: ${successRate}%`, successRate >= 80 ? 'success' : 'warning');
  
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  log('\n💥 Fatal Error:', 'error');
  log(error.message, 'error');
  process.exit(1);
});
