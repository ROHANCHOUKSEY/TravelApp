const app = require("../index"); // Adjust path if needed
const serverless = require("serverless-http");

module.exports = serverless(app);
    