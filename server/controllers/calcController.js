const tv_i_pg_pt_1 = require("../services/calc_services/tvipg_pt_1/tvipg_pt_1")
const tv_i_pg_pt_3 = require("../services/calc_services/tvipg_pt_3/tvipg_pt_3")

class CalcController { 
    async tvipg_1(req,res,next) { 
        try {
            const {N, C, H, O, M, T, P, A, Q, D, AntA, AntB, AntC} = req.body   
            const ans = tv_i_pg_pt_1(N, C, H, O, M, T, P, A, Q, D, AntA, AntB, AntC)

            return res.render('calc1', 
                {
                    N:ans.N, C:ans.C, H:ans.H, O:ans.O, M:ans.M, T:ans.T, P:ans.P, A:ans.A, Q:ans.Q,
                    AntA:ans.AntA, AntB:ans.AntB, AntC:ans.AntC,
                    n_V:ans.n_V, n_C:ans.n_C, n_H:ans.n_H, n_O2:ans.n_O2, n_N:ans.n_N,
                    beta:ans.beta, MolM:ans.MolM,
                    Vv0:ans.Vv0, VvTP:ans.VvTP,
                    Vv0A:ans.Vv0A, VvTPA:ans.VvTPA,
                    Vv0M:ans.Vv0M,VvTPM:ans.VvTPM,
                    Vv0MA:ans.Vv0MA, VvTPMA:ans.VvTPMA,
                    FiCO2:ans.FiCO2, FiH2O:ans.FiH2O, FiN2:ans.FiN2,
                    Vpg0:ans.Vpg0,
                    VpgTP:ans.VpgTP,
                    VCO20:ans.VCO20,
                    VH2O0:ans.VH2O0,
                    VN20:ans.VN20,
                    VCO2TP:ans.VCO2TP,
                    VH2OTP:ans.VH2OTP,
                    VN2TP:ans.VN2TP,
                    Vpg0M:ans.Vpg0M,
                    VpgTPM:ans.VpgTPM,
                    VCO20M:ans.VCO20M,
                    VH2O0M:ans.VH2O0M,
                    VN20M:ans.VN20M,
                    VCO2TPM:ans.VCO2TPM,
                    VH2OTPM:ans.VH2OTPM,
                    VN2TPM:ans.VN2TPM,
                    DelVv0:ans.DelVv0,
                    Vpg0A:ans.Vpg0A,
                    DelVvTP:ans.DelVvTP,
                    VpgTPA:ans.VpgTPA,
                    Vpg0AM:ans.Vpg0AM,
                    VpgTPAM:ans.VpgTPAM,
                    VCO20A:ans.VCO20A,
                    VH2O0A:ans.VH2O0A,
                    VN20A:ans.VN20A,
                    VO20A:ans.VO20A,
                    VCO2TPA:ans.VCO2TPA,
                    VH2OTPA:ans.VH2OTPA,
                    VN2TPA:ans.VN2TPA,
                    VO2TPA:ans.VO2TPA,
                    VCO20AM:ans.VCO20AM,
                    VH2O0AM:ans.VH2O0AM,
                    VN20AM:ans.VN20AM,
                    VO20AM:ans.VO20AM,
                    VCO2TPAM:ans.VCO2TPAM,
                    VH2OTPAM:ans.VH2OTPAM,
                    VN2TPAM:ans.VN2TPAM,
                    VO2TPAM:ans.VO2TPAM,
                    FiCO2A:ans.FiCO2A, FiH2OA:ans.FiH2OA, FiN2A:ans.FiN2A, FiO2A:ans.FiO2A,
                    Qn:ans.Qn, QnMolKg:ans.QnMolKg, Qsr:ans.Qsr,
                    Tburn:ans.Tburn, Tvzr:ans.Tvzr,
                    Pvzr:ans.Pvzr,
                    Fin:ans.Fin, Fiv:ans.Fiv,
                    D:ans.D, TP:ans.TP, Tvsp:ans.Tvsp, Tprpn:ans.Tprpn, Tprpv:ans.Tprpv,
                    NPGI:ans.NPGI,
                    av:ans.av, bv:ans.bv, TP:ans.TP
                })


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