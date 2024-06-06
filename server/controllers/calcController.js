class CalcController { 
    async testcalc(req,res,next) { 
        res.json('test calc works!')
    }
}

module.exports = new CalcController()