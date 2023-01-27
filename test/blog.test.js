import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../src/server';


chai.should();
chai.use(chaiHttp);

describe('GET all Blogs', () => {
  it('should return a list of users', async () => {
    const res = await chai.request(app).get('/blog/all');
    res.should.have.status(200);
    res.body.should.have.property('status');
    res.body.should.have.property('data');
  });
});

describe('GET a single blog', () => {
  it('should return a list of users', async () => {
    const res = await chai
      .request(app)
      .get('/blog/single/63bf9f12cd179d4168d1a63d');
    res.should.have.status(200);
    res.body.should.have.property('status');
    res.body.should.have.property('data');
  });
});