
const express = require("express");
const router = express.Router();
const db = require("../utils/dbpool"); 
const { apiSuccess, apiError } = require("../utils/apiresult");


router.get("/event",(req,resp)=>{
    db.query("select * from events",(err,result)=>{
        if(err)
            return resp.send(apiError(err));
        resp.send(apiSuccess(apiSuccess(result)));
    });
});

module.exports = router;