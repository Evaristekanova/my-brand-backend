const addcomment = {
  tags: ['comment'],
  description: 'all messages in dbs',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'message id',
      required: true,
      type: 'string',
      example: '63bdbc1451a42f4d46319e77',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'name', example: 'dieudonne' },
            comment: {
              type: 'string',
              description: 'content',
              example: 'comment route documenation',
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
            type: 'object ',
            example: { message: 'comment added', status: 'sucess' },
          },
        },
      },
    },
  },
};

const deleteuser = {
  tags: ['comment'],
  description: 'all messages in dbs',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'message id',
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
            example: { message: 'comment deleted' },
          },
        },
      },
    },
  },
};

const commentRouterDoc = {
  '/comment/{id}': {
    post: addcomment,
  },
  // '/newcomment/{id}': {
  //   delete: deleteuser,
  // },
};
module.exports = commentRouterDoc;
