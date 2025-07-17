const serverless = require("serverless-http");
const app = require("../index"); // Adjust path if needed


module.exports = serverless(app);
    