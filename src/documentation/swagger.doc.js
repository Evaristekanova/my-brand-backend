import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

export const docrouter = Router();

const options = {
  openapi: '3.0.1',
  info: {
    title: 'My Brand',
    version: '1.0.0',
    description:
      'this the list of Evariste brand API documentation created in node js.',
  },
  host: 'http://localhost:8000',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: 'Users', description: 'Users' },
    { name: 'Blog', description: 'Blogs' },
    { name: 'Message', description: 'Messages' },
  ],
  paths: {
    '/register/newUser': {
      post: {
        tags: ['Users'],
        description: 'User registeration',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                username: 'John',
                email: 'admin@gmail.com',
                password: '123456',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'New User was created successfully',
          },
          400: {
            description: 'Bad Request',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/deleteUser/{id}': {
      delete: {
        tags: ['Users'],
        description: 'Delete blog article',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Blog',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          401: {
            description: 'User Not Authorized',
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/login': {
      post: {
        tags: ['Users'],
        description: 'User login',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                email: 'mdash@gmail.com',
                password: '1234567',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'logged in successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/register/all': {
      get: {
        tags: ['Users'],
        description: 'list of all users',
        responses: {
          200: {
            description: 'ok',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    users: [],
                  },
                },
              },
            },
          },
        },
      },
    },
    '/blog/all': {
      get: {
        tags: ['Blog'],
        description: 'Get All Blog Articles',
        parameters: [],
        security: [],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/blog/single/{id}': {
      get: {
        security: [],
        tags: ['Blog'],
        description: 'Get single blog by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/blog/newBlog': {
      post: {
        tags: ['Blog'],
        description: 'Create new blog',
        parameters: [],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/Blog',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          401: {
            description: 'User Not Authorized',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/blog/update/{id}': {
      put: {
        tags: ['Blog'],
        description: 'Update blog',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/Blog',
              }
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          401: {
            description: 'User Not Authorized',
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/blog/delete/{id}': {
      delete: {
        tags: ['Blog'],
        description: 'Delete blog article',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Blog',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          401: {
            description: 'User Not Authorized',
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/blog/{id}/newcomment': {
      post: {
        tags: ['Blog'],
        description: 'Comment on blog article',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Blog',
              },
              example: {
                commentContent: 'improve your content',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          401: {
            description: 'Not Authorized',
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },

    '/message/newMessage': {
      post: {
        tags: ['Message'],
        security: [],
        description: 'Sending message',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Message',
              },
              example: {
                firstName: 'John',
                secondName: 'Uwumuremyi',
                senderEmail: 'john@gmail.com',
                messages: 'testing message',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/message/all': {
      get: {
        tags: ['Message'],
        description: 'Getting all messages',
        parameters: [],
        responses: {
          200: {
            description: 'successfully',
          },
          401: {
            description: 'Not Authorized',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/message/single/{id}': {
      get: {
        tags: ['Message'],
        description: 'Get single message by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },

    '/message/deleteMessage/{id}': {
      delete: {
        tags: ['Message'],
        description: 'delete single blog by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user',
          },
          name: {
            type: 'string',
            description: "User's names",
          },
          password: {
            type: 'string',
            description: "User's password",
          },
          email: {
            type: 'string',
            description: "User's email",
          },
          role: {
            type: 'string',
            description: 'User role',
          },
        },
      },
      Blog: {
        type: 'object',

        properties: {
          title: {
            type: 'string',
            description: 'Article title',
          },
          shortDescription: {
            type: 'string',
            description: 'Article content',
          },
          fullDescription: {
            type: 'string',
            description: 'Article content',
          },
          image: {
            type: 'string',
            description: 'Article image url',
            format: 'binary',
          },
        },
      },
      Message: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the message',
          },
          senderName: {
            type: 'string',
            description: 'sender name',
          },
          email: {
            type: 'string',
            description: 'sender email',
          },
          message: {
            type: 'string',
            description: 'message content',
          },
        },
      },
    },

    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

docrouter.use('/', serve, setup(options));

// export default docrouter;
