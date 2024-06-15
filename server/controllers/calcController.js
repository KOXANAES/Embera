const tv_i_pg_pt_1 = require("../services/calc_services/tvipg_pt_1/tvipg_pt_1")
const tv_i_pg_pt_3 = require("../services/calc_services/tvipg_pt_3/tvipg_pt_3")

class CalcController { 
    async tvipg_1(req,res,next) { 
        try {
            const {N, C, H, O, M, T, P, A, Q, D, AntA, AntB, AntC} = req.body   
            const ans = tv_i_pg_pt_1(N, C, H, O, M, T, P, A, Q, D, AntA, AntB, AntC)
            return res.json(ans)
        } catch(e) { 
            next(e)
        }
    }
    async tvipg_3(req,res,next) { 
        try {
            const {N, Q, cond, rozl, H, meteo, temp, V, T, L} = req.body   
            const ans = tv_i_pg_pt_3(N, Q, cond, rozl, H, meteo, temp, V, T, L)
            return res.json(ans)
        } catch(e) { 
            next(e)
        }
    }
}

module.exports = new CalcController()