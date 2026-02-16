import Validator from '../Validator.js';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  test('should return false for non-string input', () => {
    expect(validator.validateUsername(null)).toBe(false);
    expect(validator.validateUsername(undefined)).toBe(false);
    expect(validator.validateUsername(123)).toBe(false);
    expect(validator.validateUsername({})).toBe(false);
    expect(validator.validateUsername([])).toBe(false);
    expect(validator.validateUsername(true)).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(validator.validateUsername('')).toBe(false);
    expect(validator.validateUsername('   ')).toBe(false);
  });

  test('should reject usernames with invalid characters', () => {
    const invalidChars = ['@', '#', '$', '%', '^', '&', '*', '(', ')',
      '+', '=', ' ', '.', ',', '!', '?', '|', '/',
      '\\', '[', ']', '{', '}', '<', '>', '`', '~'];

    invalidChars.forEach(char => {
      expect(validator.validateUsername(`john${char}doe`)).toBe(false);
    });
  });

  test('should reject usernames starting with digits', () => {
    expect(validator.validateUsername('1john')).toBe(false);
    expect(validator.validateUsername('12john')).toBe(false);
    expect(validator.validateUsername('123john')).toBe(false);
    expect(validator.validateUsername('1234john')).toBe(false);
    expect(validator.validateUsername('0john')).toBe(false);
  });

  test('should reject usernames ending with digits', () => {
    expect(validator.validateUsername('john1')).toBe(false);
    expect(validator.validateUsername('john12')).toBe(false);
    expect(validator.validateUsername('john123')).toBe(false);
    expect(validator.validateUsername('john1234')).toBe(false);
    expect(validator.validateUsername('john0')).toBe(false);
  });

  test('should reject usernames starting with hyphen', () => {
    expect(validator.validateUsername('-john')).toBe(false);
    expect(validator.validateUsername('-john123')).toBe(false);
    expect(validator.validateUsername('--john')).toBe(false);
  });

  test('should reject usernames ending with hyphen', () => {
    expect(validator.validateUsername('john-')).toBe(false);
    expect(validator.validateUsername('john123-')).toBe(false);
    expect(validator.validateUsername('john--')).toBe(false);
  });

  test('should reject usernames starting with underscore', () => {
    expect(validator.validateUsername('_john')).toBe(false);
    expect(validator.validateUsername('_john123')).toBe(false);
    expect(validator.validateUsername('__john')).toBe(false);
  });

  test('should reject usernames ending with underscore', () => {
    expect(validator.validateUsername('john_')).toBe(false);
    expect(validator.validateUsername('john123_')).toBe(false);
    expect(validator.validateUsername('john__')).toBe(false);
  });

  test('should reject usernames with more than three digits in a row', () => {
    expect(validator.validateUsername('john1234doe')).toBe(false);
    expect(validator.validateUsername('john12345doe')).toBe(false);
    expect(validator.validateUsername('jo1234hn')).toBe(false);
    expect(validator.validateUsername('jo12345hn')).toBe(false);
    expect(validator.validateUsername('a1234b')).toBe(false);
    expect(validator.validateUsername('ab1234')).toBe(false);
    expect(validator.validateUsername('1234ab')).toBe(false);
  });

  test('should accept valid usernames with only letters', () => {
    expect(validator.validateUsername('john')).toBe(true);
    expect(validator.validateUsername('JohnDoe')).toBe(true);
    expect(validator.validateUsername('a')).toBe(true);
    expect(validator.validateUsername('abcdefghijklmnopqrstuvwxyz')).toBe(true);
    expect(validator.validateUsername('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(true);
  });

  test('should accept usernames with letters and up to three digits in a row', () => {
    expect(validator.validateUsername('john123doe')).toBe(true);
    expect(validator.validateUsername('j123ohn')).toBe(true);
    expect(validator.validateUsername('jo123hn')).toBe(true);
    expect(validator.validateUsername('a123b')).toBe(true);
    expect(validator.validateUsername('test123user')).toBe(true);
  });

  test('should accept usernames with digits spread out', () => {
    expect(validator.validateUsername('a1b2c3')).toBe(false);
    expect(validator.validateUsername('john1doe2test3')).toBe(false);
    expect(validator.validateUsername('u1s2e3r4')).toBe(false);
    expect(validator.validateUsername('a1b2c3d4')).toBe(false);
    expect(validator.validateUsername('u1s2e3r')).toBe(true);
    expect(validator.validateUsername('a1b2c3d')).toBe(true);
    expect(validator.validateUsername('john1doe2test')).toBe(true);
    expect(validator.validateUsername('a1b2c3d4e')).toBe(true);
    expect(validator.validateUsername('a123b')).toBe(true);
    expect(validator.validateUsername('a1234b')).toBe(false);
  });

  test('should accept usernames with hyphens and underscores', () => {
    expect(validator.validateUsername('john-doe')).toBe(true);
    expect(validator.validateUsername('john_doe')).toBe(true);
    expect(validator.validateUsername('john-doe_123')).toBe(false);
    expect(validator.validateUsername('joh_n-do_e')).toBe(true);
    expect(validator.validateUsername('test-user_name')).toBe(true);
    expect(validator.validateUsername('john-doe_123_test')).toBe(true);
    expect(validator.validateUsername('john_doe-123')).toBe(false);
  });

  test('should accept complex valid usernames', () => {
    expect(validator.validateUsername('john-doe_123_test')).toBe(true);
    expect(validator.validateUsername('a-b-c-d')).toBe(true);
    expect(validator.validateUsername('john_doe-123')).toBe(false);
    expect(validator.validateUsername('user-name_123_test')).toBe(true);
    expect(validator.validateUsername('my-super_username-123')).toBe(false);
    expect(validator.validateUsername('my-super_username-123_test')).toBe(true);
    expect(validator.validateUsername('test-123_user')).toBe(true);
  });

  test('should accept usernames with mixed valid characters', () => {
    expect(validator.validateUsername('a-b_c-d')).toBe(true);
    expect(validator.validateUsername('a1-b2_c3-d4')).toBe(false);
    expect(validator.validateUsername('a-1_b-2_c-3')).toBe(false);
    expect(validator.validateUsername('a1-b2_c3-d4e')).toBe(true);
    expect(validator.validateUsername('a-1_b-2_c-3d')).toBe(true);
    expect(validator.validateUsername('a1-b2-c3-d4')).toBe(false);
    expect(validator.validateUsername('a1-b2-c3-d4e')).toBe(true);
  });

  test('should handle edge cases correctly', () => {
    expect(validator.validateUsername('a')).toBe(true);
    expect(validator.validateUsername('Z')).toBe(true);
    const longUsername = 'a' + 'b'.repeat(99) + 'c';
    expect(validator.validateUsername(longUsername)).toBe(true);
    expect(validator.validateUsername('abc123def')).toBe(true);
    expect(validator.validateUsername('ab123cde')).toBe(true);
    expect(validator.validateUsername('a123bcde')).toBe(true);
    expect(validator.validateUsername('a123b')).toBe(true);
    expect(validator.validateUsername('a1b2c3d4e5f6g')).toBe(true);
  });

  test('should handle single character edge cases', () => {
    expect(validator.validateUsername('a')).toBe(true);
    expect(validator.validateUsername('1')).toBe(false);
    expect(validator.validateUsername('-')).toBe(false);
    expect(validator.validateUsername('_')).toBe(false);
    expect(validator.validateUsername(' ')).toBe(false);
  });

  test('should handle usernames with only valid separators between letters', () => {
    expect(validator.validateUsername('a-b')).toBe(true);
    expect(validator.validateUsername('a_b')).toBe(true);
    expect(validator.validateUsername('a-b-c')).toBe(true);
    expect(validator.validateUsername('a_b_c')).toBe(true);
    expect(validator.validateUsername('a-b_c')).toBe(true);
    expect(validator.validateUsername('a_b-c')).toBe(true);
  });
});
