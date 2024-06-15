const CalcError = require('../../exceptions/calc-error')

class CalcParamsValidator { 
    validate_pt3 (N, Q, cond, rozl, H, meteo, temp, V, T, L) {
        if(!N || !Q || !cond || !rozl || !H || !meteo || !temp || !V || !T || !L) throw CalcError.InitialParamsCalcError()
        if(
            typeof(N) !== 'string' ||
            typeof(Q) !== 'number' ||
            typeof(rozl) !== 'string' ||
            typeof(H) !== 'number' ||
            typeof(meteo) !== 'string' ||
            typeof(temp) !== 'number' ||
            typeof(V) !== 'number' ||
            typeof(T) !== 'number' || 
            typeof(L) !== 'number'
        ) throw CalcError.IncorrectType()
        if(
            Q <= 0 ||
            H <= 0 ||
            V <= 0 ||
            T <= 0 ||
            L <= 0
        ) throw CalcError.IncorrectValue()
        if(temp < -40 || temp > 40) { 
            throw CalcError.IncorrectTempValue(temp)
        }
    }
    validate_pt1 (N, C, H, O, M, T, P, A, Q, D, AntA, AntB, AntC) {
        console.log(N, C, H, O, M, T, P, A, Q, D, AntA, AntB, AntC)
        if(typeof(N) !== 'string') throw CalcError.IncorrectType()
        if(
            C < 0 ||
            H < 0 ||
            O < 0 ||
            M < 0 ||
            A < 0
        ) throw CalcError.IncorrectValue()
    }
}

module.exports = new CalcParamsValidator()