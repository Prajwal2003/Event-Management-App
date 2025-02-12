const bcrypt = require('bcryptjs');

const storedHash = "$2a$10$e1zUUkt.31HdFpEfQ63DkO276USx/GaGPwUef4yUIZfll69FPzaoi";
const inputPassword = "bb";

async function testPassword() {
    const isMatch = await bcrypt.compare(inputPassword, storedHash);
    console.log(isMatch ? "✅ Passwords match!" : "❌ Passwords do not match!");
}

testPassword();
