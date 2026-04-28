const request = require('supertest');
const { expect } = require('chai');

const API_URL = 'http://localhost:3000';

describe('Path Coverage Tests', () => {
  let jwtToken;

  // Test 1: GET /health
  it('TC-001: Should check health status', (done) => {
    request(API_URL)
      .get('/health')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('status').equal('ok');
        expect(res.body).to.have.property('timestamp');
        done();
      });
  });

  // Test 2: POST /auth/register
  it('TC-002: Should register a new user', (done) => {
    const timestamp = Date.now();
    request(API_URL)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        username: `testuser_${timestamp}`,
        email: `testuser_${timestamp}@example.com`,
        password: 'testpassword123'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').equal('User registered successfully');
        expect(res.body.user).to.have.property('username').equal(`testuser_${timestamp}`);
        expect(res.body.user).to.have.property('email').equal(`testuser_${timestamp}@example.com`);
        expect(res.body.user).to.have.property('id');
        done();
      });
  });

  // Test 3: POST /auth/login
  it('TC-003: Should login and return JWT token', (done) => {
    request(API_URL)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'john_doe',
        password: 'password123'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.be.a('string');
        jwtToken = res.body.token;
        done();
      });
  });

  // Test 4: POST /checkout
  it('TC-004: Should perform checkout with valid JWT token', (done) => {
    // Use the token from previous test
    request(API_URL)
      .post('/checkout')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        items: [
          { productId: '2', quantity: 1 }
        ],
        paymentMethod: 'cash'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').equal('Checkout successful');
        expect(res.body.order).to.have.property('items').that.is.an('array');
        expect(res.body.order.items[0]).to.have.property('productId').equal('2');
        expect(res.body.order.items[0]).to.have.property('name').equal('Wireless Mouse');
        expect(res.body.order).to.have.property('subtotal').equal(29.99);
        expect(res.body.order).to.have.property('discount').equal(3.00);
        expect(res.body.order).to.have.property('total').equal(26.99);
        expect(res.body.order).to.have.property('paymentMethod').equal('cash');
        done();
      });
  });
});
