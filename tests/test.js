import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
const should = chai.should();

chai.use(chaiHttp);

describe('sign route Controller', () => {
    it('should return 201 for POST /signup with a valid token', (done) => {
      const values = {
        'firstname': 'John',
       'lastname': 'Wayne',
        'othernames': 'Mark',
        'email': 'example@yahoo.com',
        'phoneNumber': '222-333-33333',
        'username': 'john54',
        'password': 'abcdef',
        'confirmpassword': 'abcdef'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(values)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
                   
          done();
        });
    });
    it('should return 400 for create user endpoint with an invalid email', (done) => {
        const values = {
          'firstname': 'John',
          'lastname': 'Wayne',
           'othernames': 'Mark',
           'email': 'exampleyahoo.com',
           'phoneNumber': '222-333-33333',
           'username': 'john54',
           'password': 'abcdef',
           'confirmpassword': 'abcdef'
            };
        chai.request(server)
          .post('/api/v1/signup')
          .send(values)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');

            done();
          });
      });
      it('should return 400 if password and confirmpassword dont match', (done) => {
        const values = {
          'firstname': 'John',
          'lastname': 'Wayne',
           'othernames': 'Mark',
           'email': 'exampleyahoo.com',
           'phoneNumber': '222-333-33333',
           'username': 'john54',
           'password': 'abcdef',
           'confirmpassword': 'akodef'
            };
        chai.request(server)
          .post('/api/v1/signup')
          .send(values)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');

            done();
          });
      });
      it('should return 409 for create user endpoint with an already taken username', (done) => {
        const values = {
          'firstname': 'John',
          'lastname': 'Wayne',
           'othernames': 'Mark',
           'email': 'example@yahoo.com',
           'phoneNumber': '222-333-33333',
           'username': 'john54',
           'password': 'abcdef',
           'confirmpassword': 'abcdef'
            };
        chai.request(server)
          .post('/api/v1/signup')
          .send(values)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');

            done();
          });
      });
      it('should return 409 for create user endpoint with an already registered email', (done) => {
        const values = {
          'firstname': 'John',
          'lastname': 'Wayne',
           'othernames': 'Mark',
           'email': 'example@yahoo.com',
           'phoneNumber': '222-333-33333',
           'username': 'john54',
           'password': 'abcdef',
           'confirmpassword': 'abcdef'
            };
        chai.request(server)
          .post('/api/v1/signup')
          .send(values)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');

            done();
          });
      });
});