const express = require("express");
const router = express.Router();
const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");

// GET all event-service mappings
router.get("/", (req, res) => {
    const sql = `
        SELECT 
            es.id,
            sub.sub_category AS event,
            s.name AS service
        FROM event_services es
        JOIN events e ON es.event_id = e.id
        JOIN event_subcategories sub ON e.subcategory_id = sub.id
        JOIN services s ON es.service_id = s.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching event-services:", err);
            return res.send(apiError("Database error"));
        }

        res.send(apiSuccess(results));
    });
});

// POST map a service to an event
router.post("/", (req, res) => {
    const { event_id, service_id } = req.body;
    if (!event_id || !service_id)
        return res.send(apiError("Missing event_id or service_id"));

    const checkSql = "SELECT * FROM event_services WHERE event_id = ? AND service_id = ?";
    db.query(checkSql, [event_id, service_id], (err, rows) => {
        if (err) return res.send(apiError(err));
        if (rows.length > 0) return res.send(apiError("Service already assigned to this event"));

        const sql = "INSERT INTO event_services (event_id, service_id) VALUES (?, ?)";
        db.query(sql, [event_id, service_id], (err, result) => {
            if (err) return res.send(apiError(err));
            res.send(apiSuccess({ id: result.insertId, event_id, service_id }));
        });
    });
});

// DELETE an event-service mapping
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM event_services WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.send(apiError(err));
        if (result.affectedRows === 0) return res.send(apiError("Mapping not found"));
        res.send(apiSuccess("Mapping deleted"));
    });
});

// GET all services for a specific event
router.get("/event/:event_id", (req, res) => {
    const sql = `
        SELECT s.id, s.name
        FROM event_services es
        JOIN services s ON es.service_id = s.id
        WHERE es.event_id = ?
    `;
    db.query(sql, [req.params.event_id], (err, results) => {
        if (err) return res.send(apiError(err));
        res.send(apiSuccess(results));
    });
});

module.exports = router;
