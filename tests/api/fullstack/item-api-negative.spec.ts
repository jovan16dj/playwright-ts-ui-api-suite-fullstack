import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test.describe('POST /items validation', () => {
  test('empty body returns 400 or 422', async ({ request }) => {
    const res = await request.post('/items', { data: {} });
    expect([400, 422]).toContain(res.status());
  });

  test('"name" wrong type returns 400 or 422', async ({ request }) => {
    const res = await request.post('/items', { data: { name: 123 } });
    expect([400, 422]).toContain(res.status());
  });
});

test.describe('burst create', () => {
  test('10 parallel creates return 201 and IDs unique', async ({ request }) => {
    const responses = await Promise.all(
      [...Array(10)].map((_, i) =>
        request.post('/items', { data: { name: `Burst${i}` } })
      )
    );

    responses.forEach(r => expect(r.status()).toBe(201));

    const ids = await Promise.all(
      responses.map(r => r.json().then(({ id }) => id as number))
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
