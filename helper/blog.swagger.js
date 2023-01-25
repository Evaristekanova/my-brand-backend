const listblogss = {
  tags: ['blogs'],
  description: 'all blogs in dbs',

  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'Array ',
            example: [
              {
                _id: '63c7923e75426914a79d53f7',
                title: 'demonstration',
                fullDescription: 'adding blog',
                imageUrl:
                  'http://res.cloudinary.com/dcsgmqseu/image/upload/v1674023485/qkukttwyo4y1n6vnigwm.jpg',
                comments: [],
                __v: 0,
              },
            ],
          },
        },
      },
    },
  },
};

const addblog = {
  tags: ['blogs'],
  description: 'all blogs in dbs',
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
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'title',
              example: 'cdvfbghjk',
            },
            shortDescription: {
              type: 'string',
              description: 'description',
              example: 'if it works do touch it ',
            },
            fullDescription: {
              type: 'string',
              description: 'description',
              example: 'xcdvfbgnhmj',
            },
            imageUrl: {
              type: 'string',
              format: 'binary',
              description: 'sdfghj',
              example: `bdsfghj`,
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
            example: {
              message: 'blog added',
              status: 'success',
            },
          },
        },
      },
    },
  },
};

const deleteblog = {
  tags: ['blogs'],
  description: 'delete blog from dbs',
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
            example: {
              message: ` blog has been deleted`,
              status: 'sucess',
            },
          },
        },
      },
    },
  },
};
const updateblog = {
  tags: ['blogs'],
  description: 'update this blog in dbs',
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
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'title',
              example: 'sertyuiokl ',
            },
            shortDescription: {
              type: 'string',
              description: 'description',
              example: 'dsftghjk ',
            },
            fullDescription: {
              type: 'string',
              description: 'content',
              example: 'cdvfgnhmjkl',
            },
            image: {
              type: 'file',
              format: 'binary',
              // description: 'cover image',
              // example: `base64 encoded image data`,
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
            example: {
              message: ` blog has been updated`,
              status: 'sucess',
            },
          },
        },
      },
    },
  },
};

const blogRouterDoc = {
  '/blog/all': {
    get: listblogss,
  },
  '/blog/newBlog': {
    post: addblog,
  },
  '/blog/delete/{id}': {
    delete: deleteblog,
  },
  '/blog/update/{id}': {
    put: updateblog,
  },
};

module.exports = blogRouterDoc;
