'use strict';

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');
let Role = require('../../../src/auth/roles-model');

const mockRequest = supergoose(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};

let roles = {
  admin: ['create','read','update','delete', 'get-key'],
  editor: ['create','read','update'],
  user: ['read'],
};

describe('Auth Router', () => {
  beforeAll(() => {
    return Promise.all(
      Object.keys(roles).map(role => {
        return new Role({
          role,
          capabilities: roles[role],
        }).save();
      })
    );
  });

  describe.each(
    Object.keys(users).map(key => [key])
  )('%s users', (userType) => {
    
    let id;
    
    it('can create one', () => {
      return mockRequest.post('/signup')
        .send(users[userType])
        .expect(200)
        .then(results => {
          var token = jwt.decode(results.text);
          id = token.id;
          expect(token.id).toBeDefined();
          expect(token.capabilities).toEqual(roles[users[userType].role]);
        });
    });

    let savedToken;
    it('can signin with basic', () => {
      return mockRequest.post('/signin')
        .auth(users[userType].username, users[userType].password)
        .expect(200)
        .then(results => {
          var token = jwt.decode(results.text);
          expect(token.id).toEqual(id);
          expect(token.capabilities).toEqual(roles[users[userType].role]);

          savedToken = results.text;
        });
    });

    it('can sign in with bearer token', async () => {
      expect(savedToken).toBeDefined();
      expect(savedToken).not.toBe('');

      let response = await mockRequest
        .post('/signin')
        .set('Authorization', `Bearer ${savedToken}`)
        .expect(200);

      var token = jwt.decode(response.text);
      expect(token.id).toEqual(id);
      expect(token.capabilities).toEqual(roles[users[userType].role]);
    });

    it('allows /key only for admin', async () => {
      let user = users[userType];
      console.log(savedToken);

      return await mockRequest
        .post('/key')
        .set('Authorization', `Bearer ${savedToken}`)
        .expect(user.role === 'admin' ? 200 : 401);
    });

    it('allows /hidden-suff for admin, editor, and user', async () => {
      let user = users[userType];
      console.log(savedToken);

      return await mockRequest
        .get('/hidden-stuff')
        .set('Authorization', `Bearer ${savedToken}`)
        .expect(user.role === 'admin' || user.role === 'editor' || user.role === 'user' ? 200 : 401);
    });

    it('allows /create-stuff for admin, and editor', async () => {
      let user = users[userType];
      console.log(savedToken);

      return await mockRequest
        .post('/create-stuff')
        .set('Authorization', `Bearer ${savedToken}`)
        .expect(user.role === 'admin' || user.role === 'editor' ? 200 : 401);
    });

    it('allows /delete-stuff for only admin', async () => {
      let user = users[userType];
      console.log(savedToken);

      return await mockRequest
        .delete('/delete-stuff')
        .set('Authorization', `Bearer ${savedToken}`)
        .expect(user.role === 'admin' ? 200 : 401);
    });


  });
});