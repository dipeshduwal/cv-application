const crypto = require('crypto');

exports.generateOtp = () => crypto.randomInt(100000, 999999).toString();

exports.getOtpExpiration = (minutes) => new Date(Date.now() + minutes * 60000);

exports.isOtpValid = (inputOtp, storedOtp, expirationTime) =>
  inputOtp === storedOtp && expirationTime > new Date();
