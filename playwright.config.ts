import { defineConfig } from '@playwright/test';
import path from 'path';
export default defineConfig({
  testDir: 'tests',
  timeout: 60000,
  retries: 0,
  webServer: {
  command: 'npm run start:ui',
  port: 3000,
  cwd: path.resolve(__dirname),
  reuseExistingServer: true,
  },
  use: { trace: 'on-first-retry' },
  projects: [
    { name: 'ui', testMatch: /tests\/ui\/fullstack\/.*\.spec\.ts$/, use: { baseURL: 'http://localhost:3000' } },
    { name: 'api', testMatch: /tests\/api\/fullstack\/.*\.spec\.ts$/, use: { baseURL: 'http://localhost:5001' } }
  ],
});