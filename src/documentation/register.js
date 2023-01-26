import userRoutesDoc from '../helper/register.swagger';

const options = {
  openapi: '3.0.0',
  info: {
    title: 'My Brand API',
    version: '1.0.0',
    description:
      'A simple User API which post a user , get all users, delete user and all users',
  },
  contact: {
    name: 'Evariste',
    email: 'dusingizimanaevariste3@gmail.com',
  },
  tags: [
    {
      name: 'Users',
      description: 'register routes ',
    },
  ],
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'local dev',
    },
  ],
  paths: {
    ...userRoutesDoc,
  },
};
export default options;
