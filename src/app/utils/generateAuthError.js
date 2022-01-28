function generateAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Неверный email или пароль';
        case 'EMAIL_EXISTS':
            return 'Пользователь с таким email уже существует';
        default:
            return 'Слишком много попыток входа';
    }
}

export default generateAuthError;
