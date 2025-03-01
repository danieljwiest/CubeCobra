// Load Environment Variables
require('dotenv').config();

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
});

module.exports = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
