const t2pr3 = require('./t2pr3')

const tv_i_pg_pt_3 = (...params) => { 
    let [N, Q, cond, H, meteo, temp, V, T, L] = params
    // пока что только для жидкостей
    const defineN = () => { 
        for(let i = 0; i <= 50; i++) { 
            let tab = t2pr3[i][0]
            if(tab === N) { 
                N = tab
                RoZH = t2pr3[i][2]
                Tkip = t2pr3[i][3]
                PDK  = t2pr3[i][4]
                K1   = t2pr3[i][5]
                K2   = t2pr3[i][6]
                K3   = t2pr3[i][7]
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
            return  {N, RoZH, Tkip, PDK, K1, K3, K7}
            }
        }
    }
    N = defineN()

    return {
        N:N, Q:Q, cond:cond, H:H, meteo:meteo, temp:temp, V:V, T:T, L:L,
    }
}

module.exports = tv_i_pg_pt_3