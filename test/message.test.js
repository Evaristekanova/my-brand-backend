const chai = require('chai');
const chaiHttp = require('chai-http');
const message = require('../src/models/messages');
const server = require('../src/server.js');

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
        .request(server)
        .post('/message/newMessage')
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

// describe('GET all messages', () => {
//   it('it should GET all the messages', (done) => {
//     chai
//       .request(server)
//       .get('/message/all')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('array');
//         res.body.length.should.be.above(0);
//         done();
//       });
//   });
// });