const fs = require('fs');
console.log('start restore .env file');
fs.writeFileSync('.env', fs.readFileSync('.env.back'));
fs.rmSync('.env.back');
console.log('restore .env file is successed!');
