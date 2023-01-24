const chai = require('chai');
const chaiHttp = require('chai-http');
const signUp = require('../src/models/signUp');
const server = require('../src/server.js');

chai.should();
chai.use(chaiHttp);

describe('GET all users', () => {
  it('it should GET all the users', (done) => {
    chai
      .request(server)
      .get('/register/all')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
        done();
      });
  });
});

describe('Get a single user', () => {
  it('return user with specified id', (done) => {
    let user = new signUp({
      name: 'Jonas',
      email: 'jonas.io',
      password: '1234567',
    });
    user.save((err, user) => {
      chai
        .request(server)
        .get('/register/user/' + user.id)
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          res.body.should.have.property('status');
          done();
        });
    });
  });
});

describe('authenticate user', () => {
  it('user must be logged in', (done) => {
    const user = { email: 'mdash@gmail.com', password: '1234567' };
    chai
      .request(server)
      .post('/login')
      .send(user)
      .end((err, res) => {
        const isThere = signUp.findOne(user.email);
        if (!isThere) {
          res.should.have.status(404);
          res.body.should.have.property('message');
        } else {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.should.have.property('message');
        }
        done();
      });
  });
});

describe('POST a User', () => {
  it('it should recieve an email, name and password', (done) => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };
    chai
      .request(server)
      .post('/register/newUser')
      .send(user)
      .end((err, res) => {
        const isThere = signUp.findOne(user.email);
        if (isThere) {
          res.should.have.status(403);
          res.body.should.have.property('message');
        } else {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('status');
        }
        done();
      });
  });
});
