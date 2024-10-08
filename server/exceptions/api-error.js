module.exports = class ApiError extends Error { 
    status;
    errors;

    constructor(status, message, errors = []) { 
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() { 
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static InactivatedError() { 
        return new ApiError(401, 'Аккаунт пользователя не активирован')
    }

    static UnknownError() { 
        return new ApiError(404, 'Произошла непредвиденная ошибка')
    }

    static EmailError() { 
        return new ApiError(404, 'Вы уже зарегистрированы на этом сервисе')
    }

    static BadRequest(message, errors = []) { 
        return new ApiError(400, message, errors)   
    }

}