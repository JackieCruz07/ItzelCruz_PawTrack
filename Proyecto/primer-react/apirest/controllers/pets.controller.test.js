const request = require('supertest');
const app = require('../../app');
const Pet = require('../../models/pets.models');
const { setupDB } = require('../test-setup');

setupDB('pets-testing');

describe('Pets Controller', () => {
  let authToken;
  
  beforeAll(async () => {
    // Login para obtener token
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    authToken = res.body.token;
  });

  it('should create a new pet', async () => {
    const res = await request(app)
      .post('/pets')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nombre: 'Firulais',
        especie: 'Perro',
        dueño: 'Juan Perez'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should get paginated pets', async () => {
    // Primero creamos algunas mascotas de prueba
    await Pet.insertMany([
      { nombre: 'Mascota 1', especie: 'Perro', dueño: 'Dueño 1' },
      { nombre: 'Mascota 2', especie: 'Gato', dueño: 'Dueño 2' },
      { nombre: 'Mascota 3', especie: 'Perro', dueño: 'Dueño 3' },
    ]);

    const res = await request(app)
      .get('/pets?page=1&limit=2')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.pets.length).toBe(2);
    expect(res.body.data).toHaveProperty('total', 3);
  });
});