const fs = require('fs');
const PropertiesReader = require('properties-reader');

// check env back is exisits!
if (fs.existsSync('.env.back')) {
    fs.writeFileSync('.env', fs.readFileSync('.env.back'));
    fs.rmSync('.env.back');
}

const __profile = process.env.profile;
fs.writeFileSync('.env.back', fs.readFileSync('.env'));
let __envContent = fs.readFileSync('.env').toString();
const __properties = PropertiesReader(`.profile.${__profile}`);
__properties.each((k, v) => {
    __envContent = __envContent.replace('${' + k + '}', v);
});
fs.writeFileSync('.env', __envContent);
console.log('replace env result is :');
console.log(__envContent);
