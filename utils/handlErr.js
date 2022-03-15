const handlErr = (err,res)=>{
    const errOb = {
        errorText: err
    }
    console.log(err)
    res.json(errOb)
}
module.exports = handlErr;