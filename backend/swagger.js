const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Your API description',
      },
      servers: [
        {
          url: 'http://localhost:3500',
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/*.js'], 
  };

  const specs = swaggerJsDoc(options);
  module.exports = {
    specs,
    swaggerUi
  }
  