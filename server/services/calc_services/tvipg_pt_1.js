const SbstConsts = require("../../models/sbstConsts")

const tv_i_pg_pt_1 = (...params) => { 
    const [N, C, H, O, M, T, P, A] = params
    SbstConsts.create({testField:'hellO!'})
    const ans = { 
        N:N
    }
    return ans
}

module.exports = tv_i_pg_pt_1