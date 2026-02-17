import Validator from '../Validator.js';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  // ===== НЕГАТИВНЫЕ ТЕСТЫ (ДОЛЖНЫ ВОЗВРАЩАТЬ FALSE) =====

  describe('should return false for invalid inputs', () => {
    test('non-string and empty inputs', () => {
      const invalidInputs = [null, undefined, 123, {}, [], true, '', '   '];
      invalidInputs.forEach(input => {
        expect(validator.validateUsername(input)).toBe(false);
      });
    });

    test('usernames with invalid characters', () => {
      const invalidChars = ['@', '#', '$', '%', '^', '&', '*', '(', ')',
        '+', '=', ' ', '.', ',', '!', '?', '|', '/',
        '\\', '[', ']', '{', '}', '<', '>', '`', '~'];

      invalidChars.forEach(char => {
        expect(validator.validateUsername(`john${char}doe`)).toBe(false);
      });
    });

    test('usernames starting with invalid first character', () => {
      const invalidFirstChars = [
        '1john', '12john', '123john', '1234john', '0john',
        '-john', '--john', '-john123',
        '_john', '__john', '_john123',
      ];

      invalidFirstChars.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('usernames ending with invalid last character', () => {
      const invalidLastChars = [
        'john1', 'john12', 'john123', 'john1234', 'john0',
        'john-', 'john123-', 'john--',
        'john_', 'john123_', 'john__',
      ];

      invalidLastChars.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('usernames with more than three digits in a row', () => {
      const moreThanThreeDigits = [
        'john1234doe', 'john12345doe', 'jo1234hn', 'jo12345hn',
        'a1234b', 'ab1234', '1234ab',
      ];

      moreThanThreeDigits.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('usernames with digits spread out but ending with digit', () => {
      const endingWithDigit = [
        'a1b2c3', 'john1doe2test3', 'u1s2e3r4', 'a1b2c3d4',
      ];

      endingWithDigit.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('complex usernames ending with digit', () => {
      const complexEndingWithDigit = [
        'john-doe_123', 'john_doe-123', 'my-super_username-123',
        'a1-b2_c3-d4', 'a-1_b-2_c-3', 'a1-b2-c3-d4',
      ];

      complexEndingWithDigit.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });
  });

  // ===== ПОЗИТИВНЫЕ ТЕСТЫ (ДОЛЖНЫ ВОЗВРАЩАТЬ TRUE) =====

  describe('should return true for valid usernames', () => {
    test('usernames with only letters', () => {
      const onlyLetters = [
        'john', 'JohnDoe', 'a',
        'abcdefghijklmnopqrstuvwxyz',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      ];

      onlyLetters.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });

    test('usernames with up to three digits in a row', () => {
      const upToThreeDigits = [
        'john123doe', 'j123ohn', 'jo123hn', 'a123b',
        'test123user', 'a123bcde', 'ab123cde', 'abc123def',
      ];

      upToThreeDigits.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });

    test('usernames with digits spread out but ending with letter', () => {
      const digitsSpreadOut = [
        'u1s2e3r', 'a1b2c3d', 'john1doe2test', 'a1b2c3d4e',
      ];

      digitsSpreadOut.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });

    test('usernames with hyphens and underscores', () => {
      const withSeparators = [
        'john-doe', 'john_doe', 'joh_n-do_e', 'test-user_name',
        'a-b', 'a_b', 'a-b-c', 'a_b_c', 'a-b_c', 'a_b-c',
        'a-b-c-d', 'a-b_c-d', 'a-b_c-d', 'a_b-c',
      ];

      withSeparators.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });

    test('complex valid usernames', () => {
      const complexValid = [
        'john-doe_123_test', 'user-name_123_test',
        'my-super_username-123_test', 'test-123_user',
      ];

      complexValid.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });

    test('edge cases', () => {
      const edgeCases = [
        'a', 'Z',
        'a' + 'b'.repeat(99) + 'c', // длинное имя
        'a1b2c3d4e5f6g',
      ];

      edgeCases.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });
  });
});
