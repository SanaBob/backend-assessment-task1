import { expect } from 'chai';
import request from 'supertest';
import server from '../index';

let id: string;

describe('POST /tweet/create', () => {
    it('should return 400 if authorId is not provided', async () => {
        const response = await request(server)
            .post('/tweet/create')
            .send({
                // authorId: '12345678',
                body: 'test',
            });
    
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('authorId/username/body not provided');
    });
    
    it('should return 400 if body is not provided', async () => {
        const response = await request(server)
            .post('/tweet/create')
            .send({
                authorId: '12345678',
                // body: 'test',
            });
    
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('authorId/username/body not provided');
    });
    
    it('should return 201 if authorId and body are provided', async () => {
        const response = await request(server)
            .post('/tweet/create')
            .send({
                authorId: '12345678',
                body: 'test',
            });
        id = response.body._id
        expect(response.status).to.equal(201);
        expect(response.body.body).to.equal('test');
    });
});

describe('GET /tweet/get', () => {
    
        it('should return 400 if authorId is not provided', async () => {
            const response = await request(server)
                .get('/tweet/get')
                .send({
                    // authorId: '12345678',
                });
    
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('No tweets found or no id has been provided');
        });
    
        it('should return 200 if authorId is provided', async () => {
            const response = await request(server)
                .get('/tweet/get')
                .send({
                    authorId: '12345678',
                });
    
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });
});

describe('PUT /tweet/update', () => {
    it('should return 404 if id is not provided', async () => {
        const response = await request(server)
            .put('/tweet/update')
            .send({
                // id,
                body: 'test',
            });
    
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('id/body not provided');
    });
    
    it('should return 400 if body is not provided', async () => {
        const response = await request(server)
            .put('/tweet/update')
            .send({
                id,
                // body: 'test',
            });
    
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('id/body not provided');
    });
    
    it('should return 201 if id and body are provided', async () => {
        const response = await request(server)
            .put('/tweet/update')
            .send({
                id,
                body: 'test123',
            });
        // console.log(response.body)
        expect(response.status).to.equal(201);
        expect(response.body.tweet.body).to.equal('test123');
    });
});

describe('DELETE /tweet/delete', () => {
    it('should return 404 if id is not provided', async () => {
        const response = await request(server)
            .delete('/tweet/delete')
            .send({
                // id,
            });
    
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('No id provided');
    });
    
    it('should return 201 if id and content are provided', async () => {
        const response = await request(server)
            .delete('/tweet/delete')
            .send({
                id,
            });
    
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Tweet deleted');
    });
});

//like/unlike test

//retweet/unretweet test
