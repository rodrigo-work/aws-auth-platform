import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      description:
        'This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.',
      version: '1.0.7',
      title: 'Swagger Petstore'
      // termsOfService: 'http://swagger.io/terms/',
      // contact: { email: 'apiteam@swagger.io' },
      // license: {
      //   name: 'Apache 2.0',
      //   url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
      // }
    },
    servers: [{ url: 'http://localhost:3001/api' }],
    schemes: ['http', 'https'],
    host: 'localhost:3001',
    basePath: '/api',
    tags: [
      {
        name: 'Groups',
        description: '',
        externalDocs: {
          description: 'more info',
          url: 'https://example.com'
        }
      },
      {
        name: 'Users',
        description: '',
        externalDocs: {
          description: 'more info',
          url: 'https://example.com'
        }
      }
    ]
    // servers: [{ url: 'http://localhost:3001/api' }]
  },
  apis: ['./src/routes/*.ts'],
  definitions: {
    ApiResponse: {
      type: 'object',
      properties: {
        code: { type: 'integer', format: 'int32' },
        type: { type: 'string' },
        message: { type: 'string' }
      }
    },
    Guest: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'me+fake@rodrigo3d.com' }
      },
      xml: { name: 'Guest' }
    },
    Category: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' }
      },
      xml: { name: 'Category' }
    },
    Pet: {
      type: 'object',
      required: ['name', 'photoUrls'],
      properties: {
        id: { type: 'integer', format: 'int64' },
        category: { $ref: '#/definitions/Category' },
        name: { type: 'string', example: 'doggie' },
        photoUrls: {
          type: 'array',
          xml: { wrapped: true },
          items: { type: 'string', xml: { name: 'photoUrl' } }
        },
        tags: {
          type: 'array',
          xml: { wrapped: true },
          items: { xml: { name: 'tag' }, $ref: '#/definitions/Tag' }
        },
        status: {
          type: 'string',
          description: 'pet status in the store',
          enum: ['available', 'pending', 'sold']
        }
      },
      xml: { name: 'Pet' }
    },
    Tag: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' }
      },
      xml: { name: 'Tag' }
    },
    Order: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        petId: { type: 'integer', format: 'int64' },
        quantity: { type: 'integer', format: 'int32' },
        shipDate: { type: 'string', format: 'date-time' },
        status: {
          type: 'string',
          description: 'Order Status',
          enum: ['placed', 'approved', 'delivered']
        },
        complete: { type: 'boolean' }
      },
      xml: { name: 'Order' }
    },
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        username: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        phone: { type: 'string' },
        userStatus: {
          type: 'integer',
          format: 'int32',
          description: 'User Status'
        }
      },
      xml: { name: 'User' }
    }
  }
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
