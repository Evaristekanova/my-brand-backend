import chaiHttp from 'chai-http';
import chai from 'chai';
import message from '../src/models/messages';
import app from './server.test';
import { set } from 'mongoose';

chai.should();
chai.use(chaiHttp);

describe('send a message', () => {
  it('visitor must fill all names, email and message', (done) => {
    const msg = new message({
      firstName: 'Jonas',
      secondName: 'Shmedtmann',
      messages: 'proud of you',
      email: 'j2@mail.com',
    });
    msg.save((err, msg) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .send(msg)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          done();
        });
    });
  });
});

//---------------------------------------//
describe('send a message', () => {
  it('visitor without fill all field', (done) => {
    const msg = new message({
      firstName: 'Jonas',
      secondName: 'Shmedtmann',
      messages: 'proud of you',
      email: '',
    });
    msg.save((err, msg) => {
      chai
        .request(app)
        .post('/api/v1/messages')
        .send(msg)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
//---------------------------------------//
describe('GET all messages without authorization', () => {
  it('it should GET all the messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/all')
      .end((err, res) => {
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('GET all messages', () => {
  let token;
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send({
      email: 'milokanova@example.com',
      password: '1234567',
    });
    token = response.body.data;
  });
  it('it should GET all messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/all')
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
});

let msgId;
let token;
describe('get single message', () => {
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send({
      email: 'milokanova@example.com',
      password: '1234567',
    });
    token = response.body.data;
  });
  beforeEach((done) => {
    const msg = new message({
      firstName: 'Jonas',
      secondName: 'Shmedtmann',
      messages: 'proud of you',
      email: 'j2@mail.com',
    });

    msg.save((err, messag) => {
      msgId = messag._id;
      done();
    });
  });

  it('should get a single message on /api/v1/message/<id> GET', (done) => {
    chai
      .request(app)
      .get(`/api/v1/messages/${msgId}`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status', 'success');
        res.body.should.have.property('data');
        done();
      });
  });
  //========================//
  it('should get a single message with incorrect id on /api/v1/message/<id> GET', (done) => {
    chai
      .request(app)
      .get(`/api/v1/messages/112345`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should get a single message with incorrect id on /api/v1/message/<id> GET', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/messages/63d8d2485cabb22a2f2b6c30`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('status');
        done();
      });
  });
});

// ==========================================//
describe('delete a message', () => {
  let msgId;
  let token;
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send({
      email: 'milokanova@example.com',
      password: '1234567',
    });
    token = response.body.data;
  });
  beforeEach((done) => {
    const msg = new message({
      firstName: 'Jonas',
      secondName: 'Shmedtmann',
      messages: 'proud of you',
      email: 'j2@mail.com',
    });

    msg.save((err, messag) => {
      msgId = messag._id;
      done();
    });
    msg.remove();
  });
});

// ===========//
describe('Accessing unknown route', () => {
  it('Accessing unknown route', (done) => {
    chai
      .request(app)
      .get('/api/v1/message/all')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// ========================= delete a message =================//

describe('DELETE a message', ()=>{
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send({
      email: 'milokanova@example.com',
      password: '1234567',
    });
    token = response.body.data;
  });
  it('deletion requires Authorization', (done)=>{
    chai
      .request(app)
      .get(`/api/v1/messages/${msgId}`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  })
})

describe('DELETE a message', () => {
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send({
      email: 'milokanova@example.com',
      password: '1234567',
    });
    token = response.body.data;
  });
  it('deletion requires Authorization', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/messages/${msgId}`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
});