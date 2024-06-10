const t3pr2 = require('./t3pr2')
const t4pr2 = require('./t4pr2')

const tv_i_pg_pt_1 = (...params) => { 
    let [N, C, H, O, M, T, P, A, Q, D, AntA, AntB, AntC] = params

    C = +C; H = +H; O = +O; M = +M; T = +T; P = +P; A = +A; Q = +Q; D = +D; AntA = +AntA; AntB = +AntB; AntC = +AntC
 
    const n_V = 1
    const n_C = n_V * C
    const n_H = n_V * (H / 2)
    const n_O2 = (((n_C * 2) + n_H) - O)/ 2
    const n_N = n_O2 * 3.76

    const beta = n_O2 / n_V
    const Vmol = 22.4
    const p0 = 101.325
    const t0 = 273

    const MolM = C * 12 + H * 1 + O * 16

    const Vv0 = +((4.76 * beta * Vmol) / (MolM)).toFixed(2)
    const VvTP = +((p0 * Vv0 * (T + t0)) / (P * t0)).toFixed(2)
    const Vv0A = +(Vv0 * A).toFixed(2)
    const VvTPA = +(VvTP * A).toFixed(2)
    const Vv0M = +(Vv0 * M).toFixed(2)
    const VvTPM = +(VvTP * M).toFixed(2)
    const Vv0MA = +(Vv0M * A).toFixed(2)
    const VvTPMA = +(VvTPM * A).toFixed(2)

    const NPGI = n_C + n_H + n_N
    let FiCO2 = +(n_C / NPGI).toFixed(3)
    let FiH2O = +(n_H / NPGI).toFixed(3)
    let FiN2 = +(n_N / NPGI).toFixed(3)

    const Vpg0 = +((NPGI * Vmol) / (n_V * MolM)).toFixed(2)
    const VpgTP = +(p0 * Vpg0 * (T + t0) / (P * t0)).toFixed(2)

    const VCO20 = +(Vpg0 * FiCO2).toFixed(2)
    const VH2O0 = +(Vpg0 * FiH2O).toFixed(2)
    const VN20 = +(Vpg0 * FiN2).toFixed(2)

    const VCO2TP = +(VpgTP * FiCO2).toFixed(2)
    const VH2OTP = +(VpgTP * FiH2O).toFixed(2)
    const VN2TP = +(VpgTP * FiN2).toFixed(2)

    const Vpg0M = +(Vpg0 * M).toFixed(2)
    const VpgTPM = +(VpgTP * M).toFixed(2)

    const VCO20M = +(VCO20 * M).toFixed(2)
    const VH2O0M = +(VH2O0 * M).toFixed(2)
    const VN20M = +(VN20 * M).toFixed(2)

    const VCO2TPM = +(VCO2TP * M).toFixed(2)
    const VH2OTPM = +(VH2OTP * M).toFixed(2)
    const VN2TPM = +(VN2TP * M).toFixed(2)

    const DelVv0 = +(Vv0 * (A - 1)).toFixed(2)
    const Vpg0A = +(Vpg0 + DelVv0).toFixed(2)
    const DelVvTP = +(Vpg0 * (A - 1)).toFixed(2)
    const VpgTPA = +(VpgTP + DelVvTP).toFixed(2)

    const Vpg0AM = +(Vpg0A * M).toFixed(2)
    const VpgTPAM = +(VpgTPA * M).toFixed(2)

    const VCO20A = VCO20
    const VH2O0A = VH2O0
    const VN20A = +(VN20 + .79 * DelVv0).toFixed(2)
    const VO20A = +(.21 * DelVv0).toFixed(2)

    const VCO2TPA = VCO2TP
    const VH2OTPA = VH2OTP
    const VN2TPA = +(VN2TP + .79 * DelVvTP).toFixed(2)
    const VO2TPA = +(.21 * DelVvTP).toFixed(2)

    const VCO20AM = +(VCO20A * M).toFixed(2)
    const VH2O0AM = +(VH2O0A * M).toFixed(2)
    const VN20AM = +(VN20A * M).toFixed(2)
    const VO20AM = +(VO20A * M).toFixed(2)

    const VCO2TPAM = +(VCO2TPA * M).toFixed(2)
    const VH2OTPAM = +(VH2OTPA * M).toFixed(2)
    const VN2TPAM = +(VN2TPA * M).toFixed(2)
    const VO2TPAM = +(VO2TPA * M).toFixed(2)

    const FiCO2A = +(VCO20A / Vpg0A * 100).toFixed(2)
    const FiH2OA = +(VH2O0A / Vpg0A * 100).toFixed(2)
    const FiN2A = +(VN20A / Vpg0A * 100).toFixed(2)
    const FiO2A = +(VO20A / Vpg0A * 100).toFixed(2)

    FiCO2 = FiCO2 * 100
    FiH2O = FiH2O * 100
    FiN2 = FiN2 * 100

    const QobrH2O = 242.2
    const QobrCO2 = 396.9
    const Qn = +((n_C * QobrCO2 + n_H * QobrH2O) - n_V * Q).toFixed(1)
    const QnMolKg = +((Qn * 1000) / MolM).toFixed(0)
    const Qsr = +(QnMolKg / Vpg0A).toFixed(2) 

    const Tburn = calcTburn()
    function calcTburn() { 
        let Qpgt2, Qpgt1
        for(let i = 0; i <= 30; i++) { 
            Qpgt2 = +(VCO20 * (t3pr2[i][3] * 100) + VH2O0 * (t3pr2[i][4] * 100) + VN20A * (t3pr2[i][1] * 100) + VO20A * (t3pr2[i][0] * 100)).toFixed(1)
            if(Qpgt2 >= QnMolKg) { 
                Qpgt1 = +(VCO20 * (t3pr2[i-1][3] * 100) + VH2O0 * (t3pr2[i-1][4] * 100) + VN20A * (t3pr2[i-1][1] * 100) + VO20A * (t3pr2[i-1][0] * 100)).toFixed(1)
                const t2 = i * 100 
                const t1 = t2 - 100
                const Tburn = +(t1 + ((t2 - t1) * (QnMolKg - Qpgt1)) / (Qpgt2 - Qpgt1)).toFixed(1)
                return Tburn
            }
        } 
    }
    const Qvzr = Qn
    const Tvzr = calcTvzr()
    function calcTvzr() { 
        let Qvzr2, Qvzr1
        for(let i = 0; i <= 30; i++) { 
            Qvzr2 = +(n_C * (t4pr2[i][3]) + n_H * (t4pr2[i][4]) + n_N * (t4pr2[i][1])).toFixed(1)
            if(Qvzr2 >= Qvzr) { 
                Qvzr1 = +(n_C * (t4pr2[i-1][3]) + n_H * (t4pr2[i-1][4]) + n_N * (t4pr2[i-1][1])).toFixed(1)
                const t2 = i * 100 
                const t1 = t2 - 100
                const Tvzr = +(t1 + ((t2 - t1) * (Qvzr - Qvzr1)) / (Qvzr2 - Qvzr1)).toFixed(1)
                return Tvzr
            }
        } 
    }
    const sumM = n_C + n_H + n_N
    const sumN = n_V + n_O2 + n_N
    const Pvzr = +((p0 * (Tvzr + t0) *  sumM) / (t0 * sumN)).toFixed(1)

    const an = 8.684
    const bn = 4.689
    const abv = () => { 
        let av, bv
        if(n_O2 <= 7.5) {av = 1.55, bv = 0.56}
        if(n_O2 > 7.5) {av = .768, bv = 6.554}
        return {av, bv}
    }

    const {av, bv} = abv()
    const Fin = +(100 / (an * n_O2 + bn)).toFixed(3)
    const Fiv = +(100 / (av * n_O2 + bv)).toFixed(3)

    const Bpr = 28
    
    const TP = +(Bpr / (D * (10 ** -4) * n_O2)).toFixed(2)
    
    const findTvsp = () => { 
        for(let t = -100; t <= 1000; t++) { 
            let pb = +(((10 ** (AntA - (AntB / (t + AntC)))) * 1000) * (t + 273)).toFixed(0)
            if(pb >= TP) { 
                console.log(pb)
                let pm = +(((10 ** (AntA - (AntB / ((t-1) + AntC)))) * 1000) * ((t-1) + 273)).toFixed(0)
                console.log(pm)
                let Tvsp = +(((t - 1) + 273) + ((TP - pm) / (pb - pm)) - 273).toFixed(1)
                return Tvsp
            }
        }
    }
    const Tvsp = findTvsp()
    const Tprpn = +((AntB / (AntA - Math.log((Fin * p0) / 100))) - AntC).toFixed(1)
    const Tprpv = +((AntB / (AntA - Math.log((Fiv * p0) / 100))) - AntC).toFixed(1)
    return { 
        N:N, C:C, H:H, O:O, M:M, T:T, P:P, A:A, Q:Q,
        n_V:n_V, n_C:n_C, n_H:n_H, n_O2:n_O2, n_N:n_N,
        beta:beta, MolM:MolM,
        Vv0:Vv0, VvTP:VvTP,
        Vv0A:Vv0A, VvTPA:VvTPA,
        Vv0M:Vv0M,VvTPM:VvTPM,
        Vv0MA:Vv0MA, VvTPMA:VvTPMA,
        FiCO2:FiCO2, FiH2O:FiH2O, FiN2:FiN2,
        Vpg0:Vpg0,
        VpgTP:VpgTP,
        VCO20:VCO20,
        VH2O0:VH2O0,
        VN20:VN20,
        VCO2TP:VCO2TP,
        VH2OTP:VH2OTP,
        VN2TP:VN2TP,
        Vpg0M:Vpg0M,
        VpgTPM:VpgTPM,
        VCO20M:VCO20M,
        VH2O0M:VH2O0M,
        VN20M:VN20M,
        VCO2TPM:VCO2TPM,
        VH2OTPM:VH2OTPM,
        VN2TPM:VN2TPM,
        DelVv0:DelVv0,
        Vpg0A:Vpg0A,
        DelVvTP:DelVvTP,
        VpgTPA:VpgTPA,
        Vpg0AM:Vpg0AM,
        VpgTPAM:VpgTPAM,
        VCO20A:VCO20A,
        VH2O0A:VH2O0A,
        VN20A:VN20A,
        VO20A:VO20A,
        VCO2TPA:VCO2TPA,
        VH2OTPA:VH2OTPA,
        VN2TPA:VN2TPA,
        VO2TPA:VO2TPA,
        VCO20AM:VCO20AM,
        VH2O0AM:VH2O0AM,
        VN20AM:VN20AM,
        VO20AM:VO20AM,
        VCO2TPAM:VCO2TPAM,
        VH2OTPAM:VH2OTPAM,
        VN2TPAM:VN2TPAM,
        VO2TPAM:VO2TPAM,
        FiCO2A:FiCO2A, FiH2OA:FiH2OA, FiN2A:FiN2A, FiO2A:FiO2A,
        Qn:Qn, QnMolKg:QnMolKg, Qsr:Qsr,
        Tburn:Tburn, Tvzr:Tvzr,
        Pvzr:Pvzr,
        Fin:Fin, Fiv:Fiv,
        D:D, TP:TP, Tvsp:Tvsp, Tprpn:Tprpn, Tprpv:Tprpv
    }
}

module.exports = tv_i_pg_pt_1