import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import blogRouter from './routes/blogRoutes';
import signupRouter from './routes/signupRoutes';
import messageCRouter from './routes/messageRoutes';
import signupControllers from './controllers/signupController';
import commentRouter from './controllers/commentController';
import connection from './connection/connection';
// import options from './documentation/register';
import { docrouter } from './documentation/swagger.doc';
// import swaggerDocumentation from '../helper/documentation.js';
dotenv.config();
const app = express();
app.use(express.json());
const corsOpts = {
  origin: '*',

  methods: ['GET', 'POST', 'DELETE', 'PUT'],

  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOpts));
// ================== ENDPOINTs ===================//
app.use('/api/v1/docs', docrouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/messages', messageCRouter);
app.use('/api/v1/users', signupRouter);
app.use('/api/v1/login', signupControllers.login);
app.use('/api/v1/logout', signupControllers.logout);
app.use('/', (req, res) => {
  res.json({message:'welcome to the home page'})
})
app.use((req, res) => {
  res.status(404).json({
    message: 'the page not found',
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
export default app;
