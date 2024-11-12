// cryptoUtils.js
const crypto = require("crypto");

// Secret key for AES encryption (Use environment variables in production)
const aesSecretKey = crypto.randomBytes(32); // 256-bit key for AES-256

// AES Encryption Function
function encrypt(data) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv("aes-256-cbc", aesSecretKey, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
}

// AES Decryption Function
function decrypt(encryptedData, iv) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    aesSecretKey,
    Buffer.from(iv, "hex"),
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Export the AES secret key, encrypt and decrypt functions
module.exports = {
  aesSecretKey,
  encrypt,
  decrypt,
};
