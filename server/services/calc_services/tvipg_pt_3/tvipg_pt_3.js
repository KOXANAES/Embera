const t2pr3 = require('./t2pr3')
const t4pr4 = require('./t4pr4')
const tv_i_pg_pt_3 = (...params) => { 
    let [N, Q, cond, rozl, H, meteo, temp, V, T, L] = params
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
            return  {N, RoZH, Tkip, PDK, h, K1, K3, K4, K6, K5, K7}
            }
        }
    }
    const Qe1 = +(K1 * K3 * K5 * K7 * Q).toFixed(3)
    const Qe2 = +(K1 * K2 * K3 * K4 * K5 * K6 * K7 * (Q / (h * RoZH))).toFixed(3)
    const L1 = defineL1()
    function defileL1() { 
        
    }
    return {
        N:N, Q:Q, cond:cond, H:H, meteo:meteo, temp:temp, V:V, T:T, L:L,
        Qe1:Qe1, Qe2:Qe2
    }
}

module.exports = tv_i_pg_pt_3