/**
 * валидатор это метод получающий в себя состояние формы и
 * требования к значениям в полях этой формы, в итоге
 * возращающий ошибки для каждого из полей
 */

export function validator(data, config) {
  /**
   * data это объект, у которого есть имена полей
   */
  const errors = {};

  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
    case 'isRequired': {
      if (typeof data === 'boolean') {
        statusValidate = !data;
      } else {
        statusValidate = data.trim() === '';
      }
      break;
    }

    case 'isEmail': {
      const emailRegExp = /^\S+@\S+\.\S+$/g;
      statusValidate = !emailRegExp.test(data);
      break;
    }

    case 'isCapitalSymbol': {
      const capitalRegExp = /[A-Z]+/g;
      statusValidate = !capitalRegExp.test(data);
      break;
    }

    case 'isContainDigit': {
      const digitRegExp = /\d+/g;
      statusValidate = !digitRegExp.test(data);
      break;
    }

    case 'min': {
      statusValidate = data.length < config.value;
      break;
    }

    default:
      break;
    }
    if (statusValidate) return config.message;
  }
  /**
   * fieldName это email, password... в объекте data
   */
  for (const fieldName in data) {
    /**
     * validateMethod это isRequired... в объекте
     * validatorConfig(внутри функции validator просто config) с ключём fieldName
     */
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
