const chalk = require('chalk');
const ErrorMsg = chalk.bgWhite.red;

const handlErr = (err,res)=>{
    const errOb = {
        errorText: err
    }
    console.log(ErrorMsg(err))
    res.json(errOb)
}
module.exports = handlErr;