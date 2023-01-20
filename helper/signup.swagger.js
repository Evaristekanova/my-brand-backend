const listUser = {
  tags: ['users'],
  description: 'all users in dbs',
  parameters: [
    {
      in: 'header',
      name: 'token',
      description: 'token',
      type: 'apiKey',
      required: true,
      example: 'Bearer ',
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'Array ',
            example: [
              {
                _id: '63c15f60d5dcce0d22c572ae',
                email: 'isisisi@hgdvfhghkvf.com',
                password:
                  '$2b$10$eU9druzf/NQ.oybcE7sytemgyk7JM3bqzAXjD5VvaFJJrHo.bbtyW',
                __v: 0,
              },
            ],
          },
        },
      },
    },
  },
};

const login = {
  tags: ['users'],
  description: 'all users in dbs',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'email',
              example: 'ishAkev.com',
            },
            password: {
              type: 'string',
              description: 'content',
              example: 'passmwback',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              message: 'successfully loged in here is your access token',
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXYuY29tIiwiaWF0IjoxNjc0MTI4NTQzfQ.1ym7mFNQbR9B8ssHSQKvs6vekqviuQE9RrRacHCEnSE',
              status: 'sucess',
            },
          },
        },
      },
    },
  },
};
const deleteuser = {
  tags: ['users'],
  description: 'delete user from dbs',
  parameters: [
    {
      name: 'email',
      in: 'path',
      description: 'email of user',
      required: true,
      type: 'string',
      example: '63bdbc1451a42f4d46319e77',
    },
    {
      in: 'header',
      name: 'token',
      description: 'token',
      type: 'string',
      required: true,
      example: 'Bearer token',
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object ',
            example: {
              message:
                'successfully deleted user with email isisisi@hgdvfhghkvf.com',
              status: 'success',
            },
          },
        },
      },
    },
  },
};

const userRouterDoc = {
  '/register/all': {
    get: listUser,
  },
  '/login': {
    post: login,
  },
  '/register/deleteUser/{id}': {
    delete: deleteuser,
  },
};
module.exports = userRouterDoc;
