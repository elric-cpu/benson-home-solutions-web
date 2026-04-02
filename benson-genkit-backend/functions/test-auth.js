const { GoogleAuth } = require('google-auth-library');
const path = require('path');

async function testAuth() {
  try {
    const auth = new GoogleAuth({
      keyFile: path.join(__dirname, 'benson-app-sa.json'),
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const client = await auth.getClient();
    await client.getAccessToken();
    console.log('✅ Token acquired successfully');
  } catch (error) {
    console.error('❌ Auth failed:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data));
    }
  }
}

testAuth();
