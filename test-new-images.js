// Test script to verify the new poster URLs work
const https = require('https');

const testUrls = [
    "https://image.tmdb.org/t/p/w500/6Ab8VHqp7WCi5BtA0vRCz8upyHh.jpg", // Dune (new)
    "https://image.tmdb.org/t/p/w500/9E2y5Q9W3emFp5Qm2vojsNDIrq1.jpg", // Deadpool (new)
    "https://image.tmdb.org/t/p/w500/5vHssUeVe25bMrof1HyaWkzP4k9.jpg", // John Wick (working)
];

function testUrl(url, name) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`✅ ${name}: Working (${res.statusCode})`);
                resolve(true);
            } else {
                console.log(`❌ ${name}: Broken (${res.statusCode})`);
                resolve(false);
            }
        }).on('error', (err) => {
            console.log(`❌ ${name}: Error - ${err.message}`);
            resolve(false);
        });
    });
}

async function testAllUrls() {
    console.log('Testing updated movie poster URLs...\n');
    
    const names = ['Dune (new)', 'Deadpool (new)', 'John Wick'];
    for (let i = 0; i < testUrls.length; i++) {
        await testUrl(testUrls[i], names[i]);
    }
    
    console.log('\n✅ Test completed!');
}

testAllUrls(); 