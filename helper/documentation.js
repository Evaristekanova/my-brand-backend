import messageRouterDoc from './message.swagger';
import blogRouterDoc from './blog.swagger';
import userRouterDoc from './signup.swagger';
import commentRouterDoc from './comment.swagger';

const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'my brand-Evariste API 3.0',
    description:
      "this is an API for my portfolio website, You can now help me improve the API whether it's by making changes to the  definition itself or to the code.That way, with time,`I can improve the API in general,`  and expose some of the new features u can also checkout my website at [https://kevin-ishimwe.github.io/my-brand-Kevin/]",
  },
  tags: [
    {
      name: 'messages',
      description: 'message routes ',
    },
    {
      name: 'blogs',
      description: 'blog routes ',
    },
    {
      name: 'users',
      description: 'user routes ',
    },
    {
      name: 'comment',
      description: 'comment routes ',
    },
  ],
  paths: {
    ...messageRouterDoc,
    ...blogRouterDoc,
    ...userRouterDoc,
    ...commentRouterDoc,
  },
};
export default swaggerDocumentation;
