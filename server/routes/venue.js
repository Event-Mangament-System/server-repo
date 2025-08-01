const express = require("express")
const db = require("../utils/dbpool")
const{ apiSuccess, apiError } = require("../utils/apiresult")

const router = express.Router();

router.get("/", (req, resp) => {
    db.query("SELECT * FROM venue", (err, result) => {
        if (err) return resp.send(apiError(err));
        resp.send(apiSuccess(result));
    });
});

router.post("/venue", (req, resp) => {
    const {name,address,capacity,price,availability} = req.body
    db.query("INSERT INTO venue(name,address,capacity,price,availability) VALUES(?, ?, ?, ?, ?)",
        [name,address,capacity,price,availability],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            // if INSERT is successful, fetch newly inserted record from db and return it
            if(result.affectedRows === 1) {
                db.query("SELECT * FROM venue WHERE id=?",
                [result.insertId],
                (err, result) => {
                    if(err)
                        return resp.send(apiError(err))
                    resp.send(apiSuccess(result[0]))
                })
            }
        }
    )
})

router.delete("/:id", (req, resp) => {
    db.query("DELETE FROM venue WHERE id=?", [req.params.id],
        (err, result) => {
            if(err)
                return resp.send(err)
            if(result.affectedRows === 1)
                resp.send(apiSuccess("venue deleted"))
            else
                resp.send(apiError("venue not found"))
        }
    )
})

router.put("/:id", (req, resp) => {
    const {name,address,capacity,price,availability} = req.body;
    db.query("UPDATE venue SET name=?, address=?, capacity=?, price=?, availability=? WHERE id=?",
        [name,address,capacity,price,availability, req.params.id],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            if(result.affectedRows !== 1)
             return  resp.send(apiError("venue not found or no change in data"))
            resp.send(apiSuccess({id: req.params.id, ...req.body}))
           
        }
    )
})
module.exports = router;