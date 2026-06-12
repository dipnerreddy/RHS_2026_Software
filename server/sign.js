/// use this file to generate a JWS token for testing purposes. Run it with `node sign.js` and copy the output token for use in your tests.

const jwt = require('jsonwebtoken');

const payload = { user_id: "12345", role: "admin" };
const secretKey = "your-super-secure-shared-secret-key-123";

// Sign the payload to create the JWS
const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

console.log("Your JWS Token:\n", token);
