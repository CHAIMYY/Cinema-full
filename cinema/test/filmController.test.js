const request = require('supertest');
const app = require('../app.js'); 
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
const FilmController = require('../src/controllers/filmController.js');

describe('Film', () => {
  it('should create a new Film', async () => {
    const response = await request(app)
      .post('/api/film/create')
      .send({
        name: 'Main Hall',
        capacity: 100,
        location: 'Downtown',
      });

    expect(response.body).toHaveProperty('name', 'Main Hall');
  });
});
