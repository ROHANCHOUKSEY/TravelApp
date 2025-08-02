const fetch = require('node-fetch');

async function testSearchEndpoint() {
  try {
    const response = await fetch('http://localhost:3002/api/host/search?q=test');
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSearchEndpoint(); 