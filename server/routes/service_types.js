const express = require('express');
const router = express.Router();
const db = require("../utils/dbpool");
const { apiError, apiResult, apiSuccess } = require('../utils/apiresult');

// GET /api/services – fetch all service types
router.get("/service_types",(req,resp)=>{
    db.query("select * from service_types",(err,result)=>{
        if(err)
            return resp.send(apiError(err));
        resp.send(apiSuccess(result));
    })
});

module.exports = router;
