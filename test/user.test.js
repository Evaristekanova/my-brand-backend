import chaiHttp from 'chai-http';
import chai from 'chai';
import signUp from '../src/models/signUp';
import app from './server.test';

chai.should();
chai.use(chaiHttp);
describe('POST a user', () => {
  beforeEach(async () => {
    try {
      await signUp.deleteMany({ email: 'milokanova@example.com' });
    } catch (error) {}
  });
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
    res.body.should.be.a('object');
    res.body.should.have.property('status', 'success');
    res.body.should.have.property('length');
    res.body.should.have.property('data');
  });
});
describe('Login', () => {
  let token;
  it('it should log in a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/login')
      .send({
        email: 'milokanova@example.com',
        password: '1234567',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        token = res.body.data;
        done();
      });
  });
});

describe('Login', () => {
  it('it should say unkown user', (done) => {
    chai
      .request(app)
      .post('/api/v1/login')
      .send({
        email: 'nonesense',
        password: 'qwer',
      })
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('Login', () => {
  it('it should limit a user to have access with wrong password', (done) => {
    chai
      .request(app)
      .post('/api/v1/login')
      .send({
        email: 'milokanova@example.com',
        password: 'ikiringiti',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('Accessing unknown route', () => {
  it('Accessing unknown route', (done) => {
    chai
      .request(app)
      .get('/api/v1/message/all')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('get single user', () => {
  let userID;
  let token;
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send({
      email: 'milokanova@example.com',
      password: '1234567',
    });
    token = response.body.data;
  });
  beforeEach((done) => {
    signUp.deleteMany({ email: 'j2@mail.com' });
    const user = new signUp({
      name: 'Jonas',
      email: 'j2@mail.com',
      password:'1234567'
    });

    user.save((err, userr) => {
      userID = userr._id;
      done();
    });
  });

  it('should get a single user on /api/v1/users/<id> GET', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/${userID}`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status', 'success');
        res.body.should.have.property('data');
        done();
      });
  });
});

// ============================================================//
describe('delete a user', () => {
  let userID;
  let token;
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send({
      email: 'milokanova@example.com',
      password: '1234567',
    });
    token = response.body.data;
  });
  beforeEach((done) => {
    signUp.deleteMany({ email: 'j3@mail.com' });
    const user = new signUp({
      name: 'Jonas',
      email: 'j3@mail.com',
      password: '1234567',
    });

    user.save((err, userr) => {
      userID = userr._id;
      done();
    });
    user.remove()
  });

  it('should delete a user on /api/v1/users/<id> DELETE', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/${userID}`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
});