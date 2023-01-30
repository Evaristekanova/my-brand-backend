import chaiHttp from 'chai-http';
import chai from 'chai';
import signUp from '../src/models/signUp';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);

describe('POST a user', () => {
  it('should create a new user', async () => {
    const res = await chai.request(app).post('/api/v1/users').send({
      name: 'Milo kanova',
      email: 'milokanova@example.com',
      password: '1234567',
    });
    res.statusCode.should.be.equal(201);
    res.body.should.have.property('message');
  });

  it('should return an error if email is already taken', async () => {
    await chai.request(app).post('/api/v1/users').send({
      name: 'Milo kanova',
      email: 'milokanova@example.com',
      password: '1234567',
    });

    const res = await chai.request(app).post('/api/v1/users').send({
      name: 'Jane Doe',
      email: 'milokanova@example.com',
      password: '1234567',
    });

    res.statusCode.should.be.equal(400);
    res.body.should.have.property('error');
  });
});

describe('GET all users', () => {
  it('should return a list of users', async () => {
    const res = await chai.request(app).get('/api/v1/users/all');
    res.should.have.status(200);
  });
});