import test from 'node:test';
import assert from 'node:assert/strict';

import { getApiBaseUrl, getBackendPort, getBotPort } from '../config/agentConfig.js';

test('uses the backend port by default', () => {
  delete process.env.AGENT_API_URL;
  delete process.env.PORT;
  assert.equal(getBackendPort(), 5000);
  assert.equal(getApiBaseUrl(), 'http://localhost:5000');
});

test('honors explicit environment overrides', () => {
  process.env.PORT = '5100';
  process.env.BOT_PORT = '3100';
  process.env.AGENT_API_URL = 'http://localhost:6100';

  assert.equal(getBackendPort(), 5100);
  assert.equal(getBotPort(), 3100);
  assert.equal(getApiBaseUrl(), 'http://localhost:6100');
});
