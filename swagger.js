const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Reservation API',
      version: '1.0.0',
      description: 'API documentation for Restaurants, Reservations, Auth, and Orders',
    },
    servers: [
      {
        url: process.env.HOST + ':' + PORT + '/api/v1', // Update if your server url is different
      },
    ],
  },
  apis: ['./routes/*.js'], // Scan all your route files for swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
