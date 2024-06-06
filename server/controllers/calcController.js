const ApiError = require("../exceptions/api-error")
const tv_i_pg_pt_1 = require("../services/calc_services/tvipg_pt_1")

class CalcController { 
    async tvipg_1(req,res,next) { 
        try {
            const {N, C, H, O, M, T, P, A} = req.body   
            if (!N || !C || !H || !O || !M || !T || !P || !A) throw ApiError.InitialParamsCalcError()
            const ans = tv_i_pg_pt_1(N, C, H, O, M, T, P, A)
            console.log(ans)
            return res.json(ans)
        } catch(e) { 
            next(e)
        }
    }
}

module.exports = new CalcController()