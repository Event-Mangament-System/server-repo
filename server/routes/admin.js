const express = require('express');
const db = require('../utils/dbpool');
const { apiSuccess, apiError } = require('../utils/apiresult');
const router = express.Router();
const { createToken } = require("../utils/jwtauth");

//Post//signin
router.post("/signin",(req,resp)=>{
    const {username, password} = req.body
    db.query("select * from admin where username =? And password = ? ",[username, password],(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        if(result.length!=1)
            return resp.send(apiError("invalid user"))
        resp.send(apiSuccess(result[0]))
    })
})

module.exports = router;