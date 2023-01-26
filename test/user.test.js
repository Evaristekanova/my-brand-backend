import chaiHttp from 'chai-http'
import chai from'chai'
import signUp from '../src/models/signUp';
import app from'../src/server'

chai.should();
chai.use(chaiHttp);

describe('GET all users', () => {
  it('it should GET all the users', (done) => {
    chai
      .request(app)
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
    const user = new signUp({
      name: 'Jonas',
      email: 'jonas.io',
      password: '1234567',
    });
    user.save((_err, use) => {
      chai
        .request(app)
        .get(`/register/user/${user.id}`)
        .send(user)
        .end((error, res) => {
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
      .request(app)
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
      .request(app)
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
