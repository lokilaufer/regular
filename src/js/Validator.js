export default class Validator {
  /**
   * Проверяет имя пользователя на соответствие правилам
   * @param {string} username - имя для проверки
   * @returns {boolean} - результат проверки
   */
  validateUsername(username) {
    if (typeof username !== 'string' || username.length === 0) {
      return false;
    }

    // Единое регулярное выражение для всех проверок
    const regex = /^(?![a-zA-Z0-9_-]*\d{4})[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z]$|^[a-zA-Z]$/;

    return regex.test(username);
  }
}
