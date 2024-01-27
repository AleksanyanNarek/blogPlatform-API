import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'blogPlatform API',
            version: '1.0.0',
            description: 'API documentation for blogPlatform API',
        }
    },
    apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

export default specs;