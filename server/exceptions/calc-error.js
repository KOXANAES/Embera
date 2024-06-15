module.exports = class CalcError extends Error { 
    status;
    errors;

    constructor(status, message, errors = []) { 
        super(message)
        this.status = status
        this.errors = errors
    }

    static InitialParamsCalcError() { 
        return new CalcError(400, 'Указаны не все параметры для выполнения запроса')
    }

    static IncorrectType() { 
        return new CalcError(400, 'Некоторые параметры имеют неверный тип данных')
    }

    static IncorrectValue() { 
        return new CalcError(400, 'Некоторые параметры имеют недопустимые отрицательные значения')
    }

    static IncorrectTempValue(temp) { 
        return new CalcError(400, `Температура ${temp} недопустима и должна быть в пределах от -40 до 40` )
    }

}