export default class Validator {
  validateUsername(username) {
    if (typeof username !== 'string' || username.length === 0) {
      return false;
    }

    for (let i = 0; i < username.length; i += 1) {
      const char = username[i];
      const code = char.charCodeAt(0);

      const isLowerLetter = code >= 97 && code <= 122;
      const isUpperLetter = code >= 65 && code <= 90;
      const isDigit = code >= 48 && code <= 57;
      const isHyphen = code === 45;
      const isUnderscore = code === 95;

      if (!isLowerLetter && !isUpperLetter && !isDigit && !isHyphen && !isUnderscore) {
        return false;
      }
    }

    const firstChar = username[0];
    const firstCode = firstChar.charCodeAt(0);
    const isFirstLower = firstCode >= 97 && firstCode <= 122;
    const isFirstUpper = firstCode >= 65 && firstCode <= 90;

    if (!isFirstLower && !isFirstUpper) {
      return false;
    }

    const lastChar = username[username.length - 1];
    const lastCode = lastChar.charCodeAt(0);
    const isLastLower = lastCode >= 97 && lastCode <= 122;
    const isLastUpper = lastCode >= 65 && lastCode <= 90;

    if (!isLastLower && !isLastUpper) {
      return false;
    }

    let digitCount = 0;
    for (let i = 0; i < username.length; i += 1) {
      const char = username[i];
      const code = char.charCodeAt(0);
      const isDigit = code >= 48 && code <= 57;

      if (isDigit) {
        digitCount += 1;
        if (digitCount > 3) {
          return false;
        }
      } else {
        digitCount = 0;
      }
    }

    return true;
  }
}
