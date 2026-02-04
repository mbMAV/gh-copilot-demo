"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const albums_1 = require("../src/data/albums");
(0, vitest_1.describe)('Albums API', () => {
    // reset in-memory data before each test by re-importing initial dataset
    let server;
    (0, vitest_1.beforeEach)(() => {
        // nothing to do; tests run against same in-memory store
    });
    (0, vitest_1.it)('GET /albums returns list', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/albums');
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
        (0, vitest_1.expect)(res.body.length).toBeGreaterThanOrEqual(6);
    });
    (0, vitest_1.it)('GET /albums?year=2021 filters by year', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/albums').query({ year: 2021 });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(Array.isArray(res.body)).toBe(true);
        for (const a of res.body)
            (0, vitest_1.expect)(a.year).toBe(2021);
    });
    (0, vitest_1.it)('GET /albums/:id returns single album', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/albums/1');
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body.id).toBe(1);
    });
    (0, vitest_1.it)('GET /albums/:id returns 404 when missing', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/albums/9999');
        (0, vitest_1.expect)(res.status).toBe(404);
    });
    (0, vitest_1.it)('POST /albums creates album', async () => {
        const payload = { title: 'New', artist: 'A', year: 2026, price: 1.23, image_url: '' };
        const res = await (0, supertest_1.default)(app_1.default).post('/albums').send(payload);
        (0, vitest_1.expect)(res.status).toBe(201);
        (0, vitest_1.expect)(res.body.id).toBeDefined();
        // cleanup: remove created
        const idx = albums_1.albums.findIndex(a => a.id === res.body.id);
        if (idx !== -1)
            albums_1.albums.splice(idx, 1);
    });
    (0, vitest_1.it)('PUT /albums/:id updates album', async () => {
        const res = await (0, supertest_1.default)(app_1.default).put('/albums/1').send({ title: 'Updated Title' });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body.title).toBe('Updated Title');
        // restore original
        const original = 'You, Me and an App Id';
        await (0, supertest_1.default)(app_1.default).put('/albums/1').send({ title: original });
    });
    (0, vitest_1.it)('DELETE /albums/:id removes album', async () => {
        // create a temporary
        const create = await (0, supertest_1.default)(app_1.default).post('/albums').send({ title: 'Tmp', artist: 'X', year: 2026 });
        (0, vitest_1.expect)(create.status).toBe(201);
        const id = create.body.id;
        const del = await (0, supertest_1.default)(app_1.default).delete(`/albums/${id}`);
        (0, vitest_1.expect)(del.status).toBe(204);
    });
});
