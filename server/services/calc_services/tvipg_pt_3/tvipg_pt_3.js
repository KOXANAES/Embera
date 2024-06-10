const t2pr3 = require('./t2pr3')
const t3pr3 = require('./t3pr3')
const t4pr4 = require('./t4pr4')
const t5pr5 = require('./t5pr5')
const tv_i_pg_pt_3 = (...params) => { 
    let [N, Q, cond, rozl, H, meteo, temp, V, T, L] = params
    V = +V
                                                                                 // пока что только для жидкостей
    N = defineN()
    function defineN() { 
        for(let i = 0; i <= 50; i++) { 
            let tab = t2pr3[i][0]
            if(tab === N) { 
                N = tab
                RoZH = t2pr3[i][2]
                Tkip = t2pr3[i][3]
                PDK  = t2pr3[i][4]
                h    = defineh(rozl, H)
                function defineh(rozl, H) { 
                    switch(rozl) { 
                        case('свободно'): h = .05; break
                        case('поддон'): h = H - .2; break
                    }
                    return h
                }
                K1   = t2pr3[i][5]
                K2   = t2pr3[i][6]
                K3   = t2pr3[i][7]
                K4   = defineK4(V)
                function defineK4(V) {
                    for(let i = 0; i <= 20; i++) { 
                        if(V <= t4pr4[0][i]) { 
                            const lR = t4pr4[0][i]
                            const K4R = t4pr4[1][i]
                            let lL = t4pr4[0][i-1]
                            let K4L = t4pr4[1][i-1]
                            if(i == 0) { 
                                K4 = 1 
                                return K4
                            }
                            K4 = +(K4L + ((K4R - K4L) * (V - lL)) / (lR - lL))
                            return K4
                        }
                    }
                    return K4
                }
                K5   = defineK5(meteo)
                function defineK5(meteo) {
                    switch(meteo) {
                        case('инверсия'): K5 = 1; break
                        case('изотермия'): K5 = .23; break
                        case('конвекция'): K5 = .08; break
                    }
                    return K5
                }
                K8   = defineK8(meteo)
                function defineK8(meteo) {
                    switch(meteo) {
                        case('инверсия'): K8 = .081; break
                        case('изотермия'): K8 = .133; break
                        case('конвекция'): K8= .235; break
                    }
                    return K8
                }
                K7 = defineK7(t2pr3[i][8])
                function defineK7(arr) {
                    const tempArray = [-40, -20, 0, 20, 40]
                    for(let j = 0; j <= tempArray.length; j++) { 
                        if(+temp <= tempArray[j]) { 
                            const limR = tempArray[j]
                            let limL= tempArray[j-1]
                            const k7R = arr[j]
                            let k7L = arr[j-1]
                            if(j == 0) { 
                                const K7 = arr[j]
                                return K7
                            }
                            const K7 = +(k7L + ((k7R - k7L) * (+temp - limL)) / (limR - limL)).toFixed(3)
                            return K7
                        }
                    }
                }
                K6 = defineK6(h)
                function defineK6(h) { 
                    const Tisp = +((h * RoZH) / (K2 * K4 * K7)).toFixed(2)
                    if(Tisp < 1) { 
                        K6 = 1 ** .8
                        return K6
                    }
                    const arr = [Tisp, T]
                    const minT = Math.min(...arr)
                    const K6 = +(minT ** .8).toFixed(2)
                    return K6
                }
            return  {N, RoZH, Tkip, PDK, h, K1, K2, K3, K4, K6, K5, K7, K8}
            }
        }
    }
    const Qe1 = +(K1 * K3 * K5 * K7 * Q).toFixed(3)
    const Qe2 = +((1 - K1) * K2 * K3 * K4 * K5 * K6 * K7 * Q / (h * RoZH)).toFixed(3)
    const L1 = defineL1()
    function defineL1() { 
        const V_for_t3pr3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        const Q_for_t3pr3 = [0.01,0.05,0.1,0.5,1,3,5,10,20,30,50,70,100,300,500,700,1000,3000]
        for(let i = 0; i <= V_for_t3pr3.length; i++) {
            if(V <= V_for_t3pr3[i]) { 
                const V_Rl = V_for_t3pr3[i]
                let V_Ll = V_for_t3pr3[i-1]
                if(V <= 1) { V_Ll = V_for_t3pr3[i] }
                for(let j = 0; j <= Q_for_t3pr3.length; j++) { 
                    if(Qe1 <= Q_for_t3pr3[j]) { 
                        if(Qe1 <= Q_for_t3pr3[0]) {              
                            if(V <= 1) {
                                const interp_comp_L = t3pr3[0][0]
                                return interp_comp_L
                            }
                            const Blim = t3pr3[i][j]
                            const Tlim = t3pr3[i-1][j]
                            const interp_comp_L = +(Tlim + ((Blim - Tlim) * (V - V_Ll)) / (V_Rl - V_Ll)).toFixed(2)
                            return interp_comp_L
                        }

                        if(V <= V_for_t3pr3[0]) {                                   // если V < 1
                            const Q_Rl = Q_for_t3pr3[j]
                            const Q_Ll = Q_for_t3pr3[j-1]
                            const RB = t3pr3[i][j]
                            const LB = t3pr3[i][j-1]
                            const interp_comp_L = +(LB + ((RB - LB) * (Qe1 - Q_Ll)) / (Q_Rl - Q_Ll)).toFixed(2)
                            return interp_comp_L
                        }

                        const Q_Rl = Q_for_t3pr3[j]
                        const Q_Ll = Q_for_t3pr3[j-1]

                        const RB = t3pr3[i][j]
                        const LB = t3pr3[i][j-1]
                        const RT = t3pr3[i-1][j]
                        const LT = t3pr3[i-1][j-1]

                        const interp_RBRT = +(RT - ((RT - RB) * (V - V_Ll)) / (V_Rl - V_Ll)).toFixed(2)
                        const interp_LBLT = +(LT - ((LT - LB) * (V - V_Ll)) / (V_Rl - V_Ll)).toFixed(2)

                        const interp_comp_L = +(interp_LBLT + ((interp_RBRT - interp_LBLT) * (Qe1 - Q_Ll)) / (Q_Rl - Q_Ll)).toFixed(3)

                        return interp_comp_L
                    }
                }
            }
        }
    }
    const L2 = defineL2()
    function defineL2() { 
        const V_for_t3pr3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        const Q_for_t3pr3 = [0.01,0.05,0.1,0.5,1,3,5,10,20,30,50,70,100,300,500,700,1000,3000]
        for(let i = 0; i <= V_for_t3pr3.length; i++) {
            if(V <= V_for_t3pr3[i]) { 
                const V_Rl = V_for_t3pr3[i]
                let V_Ll = V_for_t3pr3[i-1]

                if(V <= 1) { V_Ll = V_for_t3pr3[i] }                
                for(let j = 0; j <= Q_for_t3pr3.length; j++) { 
                    if(Qe2 <= Q_for_t3pr3[j]) { 
                        if(Qe2 <= Q_for_t3pr3[0]) {              
                            if(V <= 1) {
                                const interp_comp_L = t3pr3[0][0]
                                return interp_comp_L
                            }
                            const Blim = t3pr3[i][j]
                            const Tlim = t3pr3[i-1][j]
                            const interp_comp_L = +(Tlim + ((Blim - Tlim) * (V - V_Ll)) / (V_Rl - V_Ll)).toFixed(2)
                            return interp_comp_L
                        }

                        if(V <= V_for_t3pr3[0]) {                                   // если V < 1
                            const Q_Rl = Q_for_t3pr3[j]
                            const Q_Ll = Q_for_t3pr3[j-1]
                            const RB = t3pr3[i][j]
                            const LB = t3pr3[i][j-1]
                            const interp_comp_L = +(LB + ((RB - LB) * (Qe2 - Q_Ll)) / (Q_Rl - Q_Ll)).toFixed(2)
                            return interp_comp_L
                        }

                        const Q_Rl = Q_for_t3pr3[j]
                        const Q_Ll = Q_for_t3pr3[j-1]

                        const RB = t3pr3[i][j]
                        const LB = t3pr3[i][j-1]
                        const RT = t3pr3[i-1][j]
                        const LT = t3pr3[i-1][j-1]

                        const interp_RBRT = +(RT - ((RT - RB) * (V - V_Ll)) / (V_Rl - V_Ll)).toFixed(2)
                        const interp_LBLT = +(LT - ((LT - LB) * (V - V_Ll)) / (V_Rl - V_Ll)).toFixed(2)

                        const interp_comp_L = +(interp_LBLT + ((interp_RBRT - interp_LBLT) * (Qe2 - Q_Ll)) / (Q_Rl - Q_Ll)).toFixed(3)

                        return interp_comp_L
                    }
                }
            }
        }
    }
    const minL = Math.min(L1,L2)
    const maxL = Math.max(L1,L2)
    const LE = +(maxL + .5 * minL).toFixed(3)
    const U = defineU()
    function defineU() { 
        let arrU = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        for(let i = 0; i <= t5pr5.length; i++) { 
            let tab = t5pr5[i][0]
            if(tab === meteo) { 
                for(let j = 0; j <= t5pr5[i].length; j++) { 
                    let tablU = arrU[j]
                    if(V <= tablU) { 
                        if(j == 0) { 
                            const U = t5pr5[i][j+1]
                            console.log(U)
                            return U
                        }
                        const RU = arrU[j]  
                        const LU = arrU[j-1]
                        
                        const Rlim = t5pr5[i][j+1]
                        const Llim = t5pr5[i][j]

                        const interp_U = +(Llim + ((Rlim - Llim) * (V - LU)) / (RU - LU)).toFixed(2)
                        
                        return interp_U
                    }
                }
            }
        }
    }
    const LP = T * U
    const endL = Math.min(LP, LE)
    const Fi = defineFi()
    function defineFi() { 
        let Fi
        if(V < 0.5) { Fi = 360; return Fi } 
        if(V >= 0.5 && V < 1) { Fi = 180; return Fi } 
        if(V >= 1 && V <= 2) { Fi = 90; return Fi } 
        if(V > 2) { Fi = 45; return Fi } 
    }
    const Sv = +(8.72 * (10 ** (-3)) * (endL**2) * Fi).toFixed(3)
    const Sf = +(K8 * (endL**2) * (T**.2)).toFixed(3)
    const t = +((L / U) * 60).toFixed(2) 
    console.log(Fi)
    return {
        N:N, Q:Q, cond:cond, H:H, meteo:meteo, temp:temp, V:V, T:T, L:L,
        Qe1:Qe1, Qe2:Qe2, L1:L1, L2:L2, LE:LE, 
        U:U, LP:LP, endL:endL, Fi:Fi, Sv:Sv, Sf:Sf,
        t:t
    }
}

module.exports = tv_i_pg_pt_3