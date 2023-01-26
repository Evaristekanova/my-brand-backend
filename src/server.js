import express from 'express';
import dotenv from 'dotenv';
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

// ================== ENDPOINTs ===================//
app.use('/doc', docrouter);
app.use('/blog', blogRouter);
app.use('/message', messageCRouter);
app.use('/register', signupRouter);
app.use('/login', signupControllers.login);
app.use('/logout', signupControllers.logout);
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
