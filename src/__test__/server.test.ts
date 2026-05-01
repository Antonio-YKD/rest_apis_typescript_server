import request from "supertest"
import server from "../server.js"

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api/products')

        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)

        expect(res.status).not.toBe(404)
        
    })
})