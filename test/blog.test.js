import chaiHttp from 'chai-http';
import chai, { should } from 'chai';
import fs from 'fs';
import path from 'path';
import postBlog from '../src/models/blogs';
import app from './server.test';

chai.should();
chai.use(chaiHttp);
const { assert } = chai;

describe('GET all Blogs', () => {
  it('should return a list of all blogs', async () => {
    const res = await chai.request(app).get('/api/v1/blogs/all');
    res.should.have.status(200);
    res.body.should.have.property('status');
    res.body.should.have.property('data');
  });
});
// ------------------------------------------//
describe('Accessing unknown route', () => {
  it('Accessing unknown route', (done) => {
    chai
      .request(app)
      .get('/messa/xxx')
      .end((err, res) => {
        res.body.should.have.property('message');
        done();
      });
  });
});

//==============================================//

describe('All Blogs API EndPoints', () => {
  let token;
  let blogId;
  describe('GET  all blogs', () => {
    it('should return the expected response', (done) => {
      chai
        .request(app)
        .get('/api/v1/blogs/all')
        .end((err, res) => {
          assert.isNull(err, 'Error should be null');
          assert.equal(res.status, 200, 'Status code should be 200');
          res.body.should.be.a('object');

          done();
        });
    });
  });
  describe('GET  all blogs //Negative test', () => {
    it('trying a wrong path and see is it returns NOT FOUND error', (done) => {
      chai
        .request(app)
        .get('/blo')
        .end((err, res) => {
          // assert.equal(res.status, 404, 'Status code should be 404');
          // res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  });
  // describe('GET  a single existing blog', () => {
  //   it('Should return a single blog', (done) => {
  //     const id = '63d7048624ba163524889a86';
  //     chai
  //       .request(app)
  //       .get('/api/v1/blogs/' + id)
  //       .end((err, res) => {
  //         assert.isNull(err, 'Error should be null');
  //         assert.equal(res.status, 200, 'Status code should be 200');
  //         assert.isObject(res.body, 'Response body should be an Object');
  //         done();
  //       });
  //   });
  // });
  //   describe('API which require admin Authorization', () => {
  //     let token;
  //     let userToken;
  //     let blogId;
  //     let commentId;
  it('Admin login', (done) => {
    chai
      .request(app)
      .post('/api/v1/login')
      .send({
        email: 'milokanova@example.com',
        password: '1234567',
        isAdmin:true
      })
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.equal(res.status, 200, 'Status code should be 200');
        assert.isObject(res.body, 'Response body should be an Object');
        token = res.body.data;
        done();
      });
  });
  it('POST a new Blog, require admin Authorization', (done) => {
    chai
      .request(app)
      .post('/api/v1/blogs')
      .set('Authorization', `Bearer ${token}`)
      .attach(
        'image',
        fs.readFileSync(path.join(__dirname, 'scrnshot.PNG')),
        'scrnshot.PNG'
      )
      .field('title', 'Test')
      .field('shortDescription', 'Test')
      .field('fullDescription', 'Test')
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.equal(res.status, 201, 'Status code should be 200');
        assert.isObject(res.body, 'Response body should be an Object');
        blogId = res.body.data._id;
        done();
      });
  });

  it('POST a new Blog, with o title', (done) => {
    chai
      .request(app)
      .post('/api/v1/blogs')
      .set('Authorization', `Bearer ${token}`)
      .attach(
        'image',
        fs.readFileSync(path.join(__dirname, 'scrnshot.PNG')),
        'scrnshot.PNG'
      )
      .field('title', '')
      .field('shortDescription', '')
      .field('fullDescription', '')
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.isObject(res.body, 'Response body should be an Object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should return a single blog', (done) => {
    chai
      .request(app)
      .get(`/api/v1/blogs/${blogId}`)
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        res.should.have.status(200), res.body.should.have.property('status');
        res.body.should.have.property('data');

        done();
      });
  });

  it("Should return a single blog which doesn't exist", (done) => {
    chai
      .request(app)
      .get(`/api/v1/blogs/63d8d2485cabb22a2f2b6c30`)
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        res.should.have.status(404), res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should return a single blog with invalid id', (done) => {
    chai
      .request(app)
      .get(`/api/v1/blogs/63d8d2485cabb22a2f2b6`)
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        res.should.have.status(400), res.body.should.have.property('message');
        done();
      });
  });

  it('UPDATE existing Blog, require admin Authorization', (done) => {
    chai
      .request(app)
      .put(`/api/v1/blogs/update/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .attach(
        'image',
        fs.readFileSync(path.join(__dirname, 'scrnshot.PNG')),
        'scrnshot.PNG'
      )
      .field('title', 'updated')
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.equal(res.status, 200, 'Status code should be 200');
        assert.isObject(res.body, 'Response body should be an Object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.should.have.property('message');
        done();
      });
  });
    it('UPDATE existing Blog, require admin Authorization', (done) => {
      chai
        .request(app)
        .put(`/api/v1/blogs/update/${blogId}`)
        .attach(
          'image',
          fs.readFileSync(path.join(__dirname, 'scrnshot.PNG')),
          'scrnshot.PNG'
        )
        .field('title', 'updated')
        .end((err, res) => {
          assert.isNull(err, 'Error should be null');
          assert.equal(res.status, 403, 'Status code should be 200');
          assert.isObject(res.body, 'Response body should be an Object');
          res.body.should.have.property('message');
          done();
        });
    });
   it('UPDATE Blog which does not exist, require admin Authorization', (done) => {
     chai
       .request(app)
       .put(`/api/v1/blogs/update/63d8d2485cabb22a2f2b6c30`)
       .set('Authorization', `Bearer ${token}`)
       .attach(
         'image',
         fs.readFileSync(path.join(__dirname, 'scrnshot.PNG')),
         'scrnshot.PNG'
       )
       .field('title', 'updated')
       .end((err, res) => {
         assert.isNull(err, 'Error should be null');
         assert.isObject(res.body, 'Response body should be an Object');
         res.body.should.have.property('status');
         res.body.should.have.property('message');
         done();
       });
   });
   it('UPDATE Blog with invalid id, require admin Authorization', (done) => {
     chai
       .request(app)
       .put(`/api/v1/blogs/update/63d8d2485cabb22a2f2b6c`)
       .set('Authorization', `Bearer ${token}`)
       .attach(
         'image',
         fs.readFileSync(path.join(__dirname, 'scrnshot.PNG')),
         'scrnshot.PNG'
       )
       .field('title', 'updated')
       .end((err, res) => {
         assert.isNull(err, 'Error should be null');
         assert.equal(res.status, 400, 'Status code should be 400');
         assert.isObject(res.body, 'Response body should be an Object');
         res.body.should.have.property('message');
         done();
       });
   });
  it('User login', (done) => {
    chai
      .request(app)
      .post('/api/v1/login')
      .send({
        email: 'milokanova@example.com',
        password: '1234567',
      })
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.equal(res.status, 200, 'Status code should be 200');
        assert.isObject(res.body, 'Response body should be an Object');
        token = res.body.data;
        done();
      });
  });
  it('POST a Comment, require user Authorization', (done) => {
    chai
      .request(app)
      .post(`/api/v1/blogs/${blogId}/newcomment/`)
      .set('Authorization', `Bearer ${token}`)
      .send({ commentContent: 'This is cool' })
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.equal(res.status, 201, 'Status code should be 201');
        assert.isObject(res.body, 'Response body should be an Object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.should.have.property('comment');
        done();
      });
  });

  it('POST an empty Comment', (done) => {
    chai
      .request(app)
      .post(`/api/v1/blogs/${blogId}/newcomment/`)
      .set('Authorization', `Bearer ${token}`)
      .send({ commentContent: '' })
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.equal(res.status, 400, 'Status code should be 204');
        done();
      });
  });

  it('Should delete a blog', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/blogs/${blogId}`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        res.body.should.be.a('object')
        done();
      });
  });

   it('Should delete a blog which does not exist', (done) => {
     chai
       .request(app)
       .delete(`/api/v1/blogs/63d8d2485cabb22a2f2b6c30`)
       .set('Authorization', `bearer ${token}`)
       .end((err, res) => {
         assert.isNull(err, 'Error should be null');
         res.should.have.status(404), res.body.should.have.property('message');
         done();
       });
   });

      it('Should delete a blog with invalid id', (done) => {
        chai
          .request(app)
          .delete(`/api/v1/blogs/63d8d2485cabb22a2f2b6c`)
          .set('Authorization', `bearer ${token}`)
          .end((err, res) => {
            assert.isNull(err, 'Error should be null');
            res.should.have.status(400),
              res.body.should.have.property('message');
            done();
          });
      });

  it('display all comments', (done) => {
    chai
      .request(app)
      .get(`/api/v1/blogs/${blogId}/comments`)
      .end((err, res) => {
        assert.isNull(err, 'Error should be null');
        assert.equal(res.status, 200, 'Status code should be 200');
        assert.isObject(res.body, 'Response body should be an Object');
        res.body.should.have.property('status');
        res.body.should.have.property('length');
        res.body.should.have.property('data');
        done();
      });
  });
});
