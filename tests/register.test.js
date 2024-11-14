const request = require('supertest');
const app = require('../bin/app'); // Adjust this path based on your project structure

describe('POST /api/v1/register', () => {
    it('should return a 201 status for successful registration', async () => {
        const response = await request(app)
            .post('/api/v1/register')
            .send({
                email: "test@example.com",
                address: "123 Main St",
                full_name: "Test User",
                car_plate: "123-456-78"
            });

        expect(response.status).toBe(201);
    });
});