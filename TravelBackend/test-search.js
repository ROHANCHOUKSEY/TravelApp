const fetch = require('node-fetch');

async function testSearchEndpoint() {
  const testQueries = ['maharashtra', 'goa', 'taj mahal', 'mumbai'];
  
  for (const query of testQueries) {
    try {
      console.log(`\nTesting search for: "${query}"`);
      const response = await fetch(`http://localhost:3002/api/host/search?q=${encodeURIComponent(query)}`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error(`Test failed for "${query}":`, error);
    }
  }
}

testSearchEndpoint(); 