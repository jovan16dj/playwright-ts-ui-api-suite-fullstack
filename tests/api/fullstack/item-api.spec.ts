import { test, expect } from '@playwright/test';

test.describe('CRUD /items', () => {

  test('POST /items creates item → 201 + body contains id & name', async ({ request }) => {
    const res = await request.post('/items', { data: { name: 'Item1' } });
    expect(res.status()).toBe(201);
    const body = await res.json();
    
    expect(body).toEqual({
      id: expect.any(Number),
      name: 'Item1',
    });
  });

  test('GET /items returns list including created item', async ({ request }) => {
    const create = await request.post('/items', { data: { name: 'Item2' } });
    const created = await create.json();
    const res = await request.get('/items');
    expect(res.status()).toBe(200);
    const items = await res.json();
    expect(Array.isArray(items)).toBe(true);
    expect(items).toEqual(expect.arrayContaining([
      { id: created.id, name: 'Item2' }
    ]));
  });

  test('PUT /items/:id updates item → 200 + updated body', async ({ request }) => {
    const create = await request.post('/items', { data: { name: 'Item3' } });
    const { id } = await create.json();
    const res = await request.put(`/items/${id}`, { data: { name: 'Item3-up' } });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ id, name: 'Item3-up' });
  });

  test('PUT /items/:id on non-existent id → 404', async ({ request }) => {
    const res = await request.put('/items/9999', { data: { name: 'Nope' } });
    expect(res.status()).toBe(404);
  });

  test('DELETE /items/:id removes item → 204 + absent on GET', async ({ request }) => {
    const create = await request.post('/items', { data: { name: 'Item4' } });
    const { id } = await create.json();
    const del = await request.delete(`/items/${id}`);
    expect(del.status()).toBe(204);
    const list = await request.get('/items');
    const items = await list.json();
    expect(items.some(i => i.id === id)).toBe(false);
  });

  test('DELETE /items/:id on non-existent id → 404', async ({ request }) => {
    const res = await request.delete('/items/9999');
    expect(res.status()).toBe(404);
  });

});
