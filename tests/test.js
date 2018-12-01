import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
const should = chai.should();

chai.use(chaiHttp);

 let token = '';
// User Signup Tests
describe('user route Controller', () => {
    
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
          token = res.body.token
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

// User Login Tests

describe('login route Controller', () => {
  it('should return 201 for POST /login with a valid token', (done) => {
    const values = {
    
      'email': 'example@yahoo.com',
      'password': 'abcdef'
     
    };
    chai.request(server)
      .post('/api/v1/login')
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
  
  it('should return 400 for login user endpoint with an invalid email', (done) => {
      const values = {
      
         'email': '',
         'password': 'abcdef'
          };
      chai.request(server)
        .post('/api/v1/login')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
    it('should return 400 for login user endpoint with an invalid password', (done) => {
      const values = {

         'email': 'example@yahoo.com',
           'password': '',
       
          };
      chai.request(server)
        .post('/api/v1/login')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
    it('should return 400 for login user endpoint with an invalid token', (done) => {
      const values = {
         'email': 'exambzpleyahoo.com',
         'password': 'abcdnsswef'
          };
      chai.request(server)
        .post('/api/v1/login')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
  });

  // Get User Test
  describe('Get user Controller', () => {
    it('should return 200 for GET /get-user with a valid token', (done) => {
      
      chai.request(server)
        .get('/api/v1/get-user/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
                   
          done();
        });
    });
    
    it('should return 400 for get user endpoint with an invalid token', (done) => {
 
        chai.request(server)
          .get('/api/v1/get-user/1')
          .set('x-auth-token', 'gfjdgej')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
                  
            done();
          });
      });
    })
      
    // RED-FLAG TEST

    // Create -flag tests
    describe('create red-flag Controller', () => {
      it('should return 201 for POST /create redflag with a valid token', (done) => {
        const values = {
          'type': 'red-flag',
          'location': 'yaba',
           'comment': 'Policemen extorting and intimidating bus drivers'
        };
        chai.request(server)
          .post('/api/v1/create-red-flag')
          .send(values)
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
                     
            done();
          });
      });
      
      it('should return 400 for create red-flag endpoint with an invalid type', (done) => {
          const values = {
            'type': 'redfl ag',
            'location': 'yaba',
             'comment': 'Policemen extorting and intimidating bus drivers'
              };
          chai.request(server)
            .post('/api/v1/create-red-flag')
            .send(values)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('error');
    
              done();
            });
        });
        it('should return 400 for create report endpoint with no comment', (done) => {
          const values = {
            'type': 'red-flag',
            'location': 'yaba',
             'comment': ''
              };
          chai.request(server)
            .post('/api/v1/create-red-flag')
            .send(values)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('error');
    
              done();
            });
        });
        it('should return 400 for create red-flag endpoint with no type', (done) => {
          const values = {
            'type': '',
            'location': 'yaba',
             'comment': 'Policemen extorting and intimidating bus drivers'
              };
          chai.request(server)
            .post('/api/v1/create-red-flag')
            .send(values)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('error');
    
              done();
            });
        });
    
      });

  // Get All Red Flags Test

      describe('Get all red-flags Controller', () => {
        it('should return 200 for GET /get-all-redflags with a valid token', (done) => {
        
          chai.request(server)
            .get('/api/v1/get-red-flags')
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
                       
              done();
            });
        });
        
        it('should return 400 for get red flags endpoint with an invalid token', (done) => {
          
            chai.request(server)
              .get('/api/v1/get-red-flags')
              .set('x-auth-token', 'gfjdgej')
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                      
                done();
              });
          });
              
        });

      // Get single red-flag report

        describe('Get single red-flag Controller', () => {
          it('should return 200 for GET /get-single-redflag with a valid token', (done) => {
         
            chai.request(server)
              .get('/api/v1/get-red-flag/1')
              .set('x-auth-token', token)
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                         
                done();
              });
          });
          
          it('should return 400 for get single red flag endpoint with an invalid token', (done) => {
            
              chai.request(server)
                .get('/api/v1/get-red-flag/1')
                .set('x-auth-token', 'gfjdgej')
                .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status');
                        
                  done();
                });
            });
            it('should return 404 for get single red flag endpoint with an invalid id', (done) => {
              
              chai.request(server)
                .get('/api/v1/get-red-flag/ams')
                .set('x-auth-token', token)
                .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status');
                        
                  done();
                });
            });               
          });

  //Edit Red-flag
  describe('Edit red-flag Controller', () => {
    it('should return 200 for patch /edit redflag with a valid token', (done) => {
      const values = {
        'type': 'red-flag',
        'location': 'yaba',
        'comment': 'Policemen extorting and intimidating bus drivers'
      };
      chai.request(server)
        .patch('/api/v1/red-flags/1/comment')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
                   
          done();
        });
    });
    it('should return 400 for edit red-flag endpoint with an invalid type', (done) => {
      const values = {
        'type': 'redfl ag',
        'location': 'yaba',
         'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .patch('/api/v1/red-flags/1/comment')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
    it('should return 400 for edit red-flag report endpoint with no comment', (done) => {
      const values = {
        'type': 'red-flag',
        'location': 'yaba',
         'comment': ''
          };
      chai.request(server)
        .patch('/api/v1/red-flags/1/comment')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
    it('should return 400 for edit red flag endpoint with an invalid token', (done) => {
      const values = {
      'type': 'red-flag',
      'location': 'ikeja',
      'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .patch('/api/v1/red-flags/1/comment')
        .send(values)
        .set('x-auth-token', 'gfjdgej')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    });
    it('should return 404 for edit red flag endpoint with an invalid id', (done) => {
      const values = {
      'type': 'red-flag',
      'location': 'ikeja',
      'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .patch('/api/v1/red-flags/ams/comment')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    }); 

  });

  //DELETE RED-FLAGS
  describe('Delete red-flag Controller', () => {
    it('should return 200 for delete /delete redflag with a valid token', (done) => {
      const values = {
        'createdOn': '2018-12-30T05:40:59.076Z',
        'createdBy': '2',
        'type': 'red-flag',
        'location': 'yaba',
        'comment': 'Policemen extorting and intimidating bus drivers'
      };
      chai.request(server)
        .delete('/api/v1/delete-red-flag/1')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
                   
          done();
        });
    });
    it('should return 400 for delete red flag endpoint with an invalid token', (done) => {
      const values = {
      'createdOn': '2018-12-30T05:40:59.076Z',
      'createdBy': '2',
      'type': 'red-flag',
      'location': 'ikeja',
      'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .delete('/api/v1/delete-red-flag/1')
        .send(values)
        .set('x-auth-token', 'gfjdgej')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    });
    it('should return 404 for delete red flag endpoint with an invalid id', (done) => {
      const values = {
      'createdOn': '2018-12-30T05:40:59.076Z',
      'createdBy': '2',
      'type': 'red-flag',
      'location': 'ikeja',
      'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .delete('/api/v1/delete-red-flag/ams')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    }); 
  });

  // Change Location
  describe('Change Location Controller', () => {
      
    it('should return 400 for change location  endpoint with no location', (done) => {
      const values = {
        'type': 'red-flag',
        'location': '',
         'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .patch('/api/v1/red-flags/1/location')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
    it('should return 400 for change location endpoint with an invalid token', (done) => {
      const values = {
      'type': 'red-flag',
      'location': 'ikeja',
      'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .patch('/api/v1/red-flags/1/location')
        .send(values)
        .set('x-auth-token', 'gfjdgej')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    });
    it('should return 404 for change location endpoint with an invalid id', (done) => {
      const values = {
      'type': 'red-flag',
      'location': 'ikeja',
      'comment': 'Policemen extorting and intimidating bus drivers'
          };
      chai.request(server)
        .patch('/api/v1/red-flags/ams/location')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    }); 

  });

  // INTERVENTION TEST

    // Create intervention tests
    describe('create intervention Controller', () => {
      it('should return 201 for POST /create intervention with a valid token', (done) => {
        const values = {
          'type': 'intervention',
          'location': 'okoko',
          'comment': 'too many potholes on the road, it causes accidents'
        };
        chai.request(server)
          .post('/api/v1/create-intervention')
          .send(values)
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
                     
            done();
          });
      });
      
      it('should return 400 for create intervention endpoint with an invalid type', (done) => {
          const values = {
            'type': 'interven  tion',
            'location': 'okoko',
            'comment': 'too many potholes on the road, it causes accidents'
              };
          chai.request(server)
            .post('/api/v1/create-intervention')
            .send(values)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('error');
    
              done();
            });
        });
        it('should return 400 for create intervention report endpoint with no comment', (done) => {
          const values = {
            'type': 'intervention',
            'location': 'okoko',
             'comment': ''
              };
          chai.request(server)
            .post('/api/v1/create-intervention')
            .send(values)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('error');
    
              done();
            });
        });
        it('should return 400 for create red-flag endpoint with no type', (done) => {
          const values = {
            'type': '',
            'location': 'okoko',
            'comment': 'too many potholes on the road, it causes accidents'
              };
          chai.request(server)
            .post('/api/v1/create-intervention')
            .send(values)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('error');
    
              done();
            });
        });
    
      });

      // Get All Intervention Reports Test

      describe('Get all interventions Controller', () => {
        it('should return 200 for GET /get-all-interventions with a valid token', (done) => {
         
          chai.request(server)
            .get('/api/v1/get-interventions')
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
                       
              done();
            });
        });
        
        it('should return 400 for get red flags endpoint with an invalid token', (done) => {
     
            chai.request(server)
              .get('/api/v1/get-interventions')
              .set('x-auth-token', 'gfjdgej')
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                      
                done();
              });
          });
              
        });

      
     // Get single intervention report test

     describe('Get single intervention Controller', () => {
      it('should return 200 for GET /get-single-intervention with a valid token', (done) => {
     
        chai.request(server)
          .get('/api/v1/get-intervention/1')
          .set('x-auth-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
                     
            done();
          });
      });
      
      it('should return 400 for get single intervention endpoint with an invalid token', (done) => {
  
          chai.request(server)
            .get('/api/v1/get-intervention/1')
            .set('x-auth-token', 'gfjdgej')
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
                    
              done();
            });
        });
        it('should return 404 for get single intervention endpoint with an invalid id', (done) => {
    
          chai.request(server)
            .get('/api/v1/get-intervention/ams')
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('status');
                    
              done();
            });
        });               
      });

        //Edit Intervention report test

  describe('Edit intervention Controller', () => {
    it('should return 200 for patch /edit intervention with a valid token', (done) => {
      const values = {
        'type': 'intervention',
        'location': 'okoko',
        'comment': 'too many potholes on the road, it causes accidents'
      };
      chai.request(server)
        .patch('/api/v1/interventions/1/comment')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
                   
          done();
        });
    });

    it('should return 400 for edit intervention report endpoint with no comment', (done) => {
      const values = {
        'type': 'intervention',
          'location': 'okoko',
          'comment': ''
          };
      chai.request(server)
        .patch('/api/v1/interventions/1/comment')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
    it('should return 400 for edit intervention endpoint with an invalid token', (done) => {
      const values = {
        'type': 'intervention',
        'location': 'okoko',
        'comment': 'too many potholes on the road, it causes accidents'
          };
      chai.request(server)
        .patch('/api/v1/interventions/1/comment')
        .send(values)
        .set('x-auth-token', 'gfjdgej')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    });
    it('should return 404 for edit intervention endpoint with an invalid id', (done) => {
      const values = {
        'type': 'intervention',
        'location': 'okoko',
        'comment': 'too many potholes on the road, it causes accidents'
          };
      chai.request(server)
        .patch('/api/v1/interventions/ams/comment')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    }); 

  });

  //Delete Intervention Records Test

  describe('Delete intervention Controller', () => {
    it('should return 200 for delete /delete intervention with a valid token', (done) => {

      chai.request(server)
        .delete('/api/v1/delete-intervention/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
                   
          done();
        });
    });
    it('should return 400 for delete intervention endpoint with an invalid token', (done) => {

      chai.request(server)
        .delete('/api/v1/delete-intervention/1')
        .set('x-auth-token', 'gfjdgej')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    });
    it('should return 404 for delete intervention endpoint with an invalid id', (done) => {
    
      chai.request(server)
        .delete('/api/v1/delete-intervention/ams')
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
          
        });
    }); 
  });

  // Change Location

  describe('Change Location Controller', () => {
   
    it('should return 400 for change location endpoint with no location', (done) => {
      const values = {
        'type': 'intervention',
          'location': '',
          'comment': 'too many potholes on the road, it causes accidents'
          };
      chai.request(server)
        .patch('/api/v1/interventions/1/location')
        .send(values)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');

          done();
        });
    });
    it('should return 400 for change location endpoint with an invalid token', (done) => {
      const values = {
        'type': 'intervention',
        'location': 'okoko',
        'comment': 'too many potholes on the road, it causes accidents'
          };
      chai.request(server)
        .patch('/api/v1/interventions/1/location')
        .send(values)
        .set('x-auth-token', 'gfjdgej')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    });
    it('should return 404 for change location endpoint with an invalid id', (done) => {
      const values = {
        'type': 'intervention',
        'location': 'okoko',
        'comment': 'too many potholes on the road, it causes accidents'
          };
      chai.request(server)
        .patch('/api/v1/interventions/ams/location')
        .send(values)
        .set('x-auth-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
                
          done();
        });
    }); 

  });