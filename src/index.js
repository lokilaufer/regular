import Validator from './js/Validator.js';

export { Validator };

const validator = new Validator();

console.log('=== Валидатор никнеймов ===');
console.log('john-doe:', validator.validateUsername('john-doe'));
console.log('john123:', validator.validateUsername('john123'));
console.log('123john:', validator.validateUsername('123john'));
console.log('john1234:', validator.validateUsername('john1234'));
console.log('john@doe:', validator.validateUsername('john@doe'));
console.log('john_doe:', validator.validateUsername('john_doe'));
console.log('john-doe_123:', validator.validateUsername('john-doe_123'));
console.log('a-b-c-d:', validator.validateUsername('a-b-c-d'));
console.log('user-name_123_test:', validator.validateUsername('user-name_123_test'));
