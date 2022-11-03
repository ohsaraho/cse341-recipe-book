const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes API',
    description: 'Recipes project using an API',
  },
  host: 'recipe-book-project.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    Authorization: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Authentication token (Bearer)",
      example: "Bearer <your token>",
    },
  },
  security: [
    {
      Authorization: [],
    },
  ],
};



const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

//Run server after it gets generated

// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {

//   await import('./index.js');

// });