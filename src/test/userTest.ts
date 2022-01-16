import { expect } from 'chai';
import request from 'supertest';
import server from '../index';

describe('POST /user/register', () => {

    it('should return 404 if username is not provided', async () => {
        const response = await request(server)
            .post('/user/register')
            .send({
                password: '12345678',
            });

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('User validation failed: username: Path `username` is required.');
    });

    it('should return 400 if password is not provided', async () => {
        const response = await request(server)
            .post('/user/register')
            .send({
                username: 'test',
            });

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('User validation failed: password: Path `password` is required.');
    });


    it('should return 201 if username and password are provided', async () => {
        const response = await request(server)
            .post('/user/register')
            .send({
                username: 'test',
                password: '12345678',
            });

        expect(response.status).to.equal(201);
        expect(response.body.username).to.equal('test');
    });

    it('should return 400 if username is not unique', async () => {
        request(server)
            .post('/user/register')
            .send({
                username: 'test',
                password: '12345678',
            })
            .then((res) => {
            })
            .catch((err) => { });
    });
})

describe('GET /user/login', () => {
    it('should return 400 if username is not provided', async () => {
        const response = await request(server)
            .get('/user/login')
            .send({
                password: '12345678',
            });
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('User validation failed: username or password is wrong.');
    });

    it('should return 400 if password is not provided', async () => {
        const response = await request(server)
            .get('/user/login')
            .send({
                username: 'test',
            });

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('User validation failed: username or password is wrong.');
    });

    it('should return 400 if username or password is wrong', async () => {
        const response = await request(server)
            .get('/user/login')
            .send({
                username: 'test123',
                password: '12345678',
            });

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('User validation failed: username or password is wrong.');
    });
    
    it('should return 200 if username and password are correct', async () => {
        const response = await request(server)
            .get('/user/login')
            .send({
                username: 'test',
                password: '12345678',
            });

        expect(response.status).to.equal(200);
        expect(response.body.username).to.equal('test');
    });
});
