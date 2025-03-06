// swagger-autogen.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    version: '1.0.0',
    description: 'API for managing contacts',
  },
  host: 'localhost:3000',
  basePath: '/api/contacts',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Contacts',
      description: 'Operations related to contacts',
    },
  ],
};

const outputFile = './swagger-output.json'; // Output file for Swagger documentation
const endpointsFiles = ['./routes/contact.js']; // Path to your route files

// Run swagger-autogen
swaggerAutogen(outputFile, endpointsFiles, doc);