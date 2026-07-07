import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEmailPassword, formatEnvValue } from '../utils/emailAuth.js';

test('normaliza contraseñas de aplicación con espacios', () => {
  assert.equal(normalizeEmailPassword('  abcd efgh ijkl mnop  '), 'abcdefghijklmnop');
  assert.equal(normalizeEmailPassword('  miPassword123  '), 'miPassword123');
});

test('formatea valores de entorno con espacios o caracteres especiales', () => {
  assert.equal(formatEnvValue('abc def'), '"abc def"');
  assert.equal(formatEnvValue('abc#def'), '"abc#def"');
  assert.equal(formatEnvValue('simple123'), 'simple123');
});
