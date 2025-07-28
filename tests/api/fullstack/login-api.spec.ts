import { test, expect } from '@playwright/test';

test.describe('POST /login', () => {
  test('valid credentials → 200 + success message', async ({ request }) => {
    const res = await request.post('/login', {
      data: { username: 'admin', password: 'admin' },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ message: 'Login successful' });
  });

  test('invalid credentials → 401 + error message', async ({ request }) => {
    const res = await request.post('/login', {
      data: { username: 'foo', password: 'bar' },
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ message: 'Invalid credentials' });
  });
});
