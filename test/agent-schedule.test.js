import test from 'node:test';
import assert from 'node:assert/strict';

import { isWithinWorkingHours } from '../config/agentSchedule.js';

test('allows work on weekdays between 8:00 and 19:00', () => {
  assert.equal(isWithinWorkingHours(new Date('2026-07-06T07:59:00')), false);
  assert.equal(isWithinWorkingHours(new Date('2026-07-06T08:00:00')), true);
  assert.equal(isWithinWorkingHours(new Date('2026-07-06T18:59:00')), true);
  assert.equal(isWithinWorkingHours(new Date('2026-07-06T19:00:00')), false);
});

test('blocks weekends and non-working days', () => {
  assert.equal(isWithinWorkingHours(new Date('2026-07-04T10:00:00')), false);
  assert.equal(isWithinWorkingHours(new Date('2026-07-05T10:00:00')), false);
});
