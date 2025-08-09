const express = require("express")
const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")

const router = express.Router();

router.get("/",(req,resp)=>{
    db.query("select * from services",(err, result)=>{
        if(err)
            return resp.send(apiError(err))
        resp.send(apiSuccess(result))
    });
});

router.post("/addservices",(req,resp)=>{
    const {name} = req.body
    db.query("insert into services(name) values (?)",[name],(err,result)=>{
        if(err)
            return resp.send(apiError(err))
        if(result.affectedRows===1){
            const newID = req.params.newID
            db.query("select * from services where id=?",[newID],(err,result)=>{
                if(err)
                    return resp.send(apiError(err))
                return resp.send(apiSuccess(result[0]))
            })
        }
    })
})

router.delete("/delete/:id",(req,resp)=>{
    db.query("delete from services where id=?",[req.params.id],(err,result)=>{
         if(err)
                return resp.send(err)
            if(result.affectedRows === 1)
                resp.send(apiSuccess("service deleted"))
            else
                resp.send(apiError("service not found"))
    })
})




// API to get service_types with service name
router.get("/service-types", (req, res) => {
  const query = `
    SELECT st.id, st.name AS service_type_name, st.price, s.name AS service_name
    FROM service_types st
    INNER JOIN services s ON st.service_id = s.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

module.exports = router;