import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { albums as albumsData } from '../src/data/albums';

describe('Albums API', () => {
  // reset in-memory data before each test by re-importing initial dataset
  let server: any;

  beforeEach(() => {
    // nothing to do; tests run against same in-memory store
  });

  it('GET /albums returns list', async () => {
    const res = await request(app).get('/albums');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(6);
  });

  it('GET /albums?year=2021 filters by year', async () => {
    const res = await request(app).get('/albums').query({ year: 2021 });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    for (const a of res.body) expect(a.year).toBe(2021);
  });

  it('GET /albums/:id returns single album', async () => {
    const res = await request(app).get('/albums/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('GET /albums/:id returns 404 when missing', async () => {
    const res = await request(app).get('/albums/9999');
    expect(res.status).toBe(404);
  });

  it('POST /albums creates album', async () => {
    const payload = { title: 'New', artist: 'A', year: 2026, price: 1.23, image_url: '' };
    const res = await request(app).post('/albums').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    // cleanup: remove created
    const idx = albumsData.findIndex(a => a.id === res.body.id);
    if (idx !== -1) albumsData.splice(idx, 1);
  });

  it('PUT /albums/:id updates album', async () => {
    const res = await request(app).put('/albums/1').send({ title: 'Updated Title' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
    // restore original
    const original = 'You, Me and an App Id';
    await request(app).put('/albums/1').send({ title: original });
  });

  it('DELETE /albums/:id removes album', async () => {
    // create a temporary
    const create = await request(app).post('/albums').send({ title: 'Tmp', artist: 'X', year: 2026 });
    expect(create.status).toBe(201);
    const id = create.body.id;
    const del = await request(app).delete(`/albums/${id}`);
    expect(del.status).toBe(204);
  });
});
