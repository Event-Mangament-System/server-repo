const express = require("express");
const router = express.Router();
const db = require("../utils/dbpool"); 
const { apiSuccess, apiError } = require("../utils/apiresult");
const { validateFields } = require("../utils/validation");

// GET all bookings
router.get("/", (req, resp) => {
    db.query("SELECT * FROM booking", (err, results) => {
        if (err) return resp.send(apiError(err));
        resp.send(apiSuccess(results));
    });
});

// GET booking by ID
router.get("/:id", (req, resp) => {
    db.query("SELECT * FROM booking WHERE id=?", [req.params.id], (err, results) => {
        if (err) return resp.send(apiError(err));
        if (results.length !== 1) return resp.send(apiError("Booking not found"));
        resp.send(apiSuccess(results[0]));
    });
});

// POST a new booking
/* router.post("/", (req, resp) => {
     const { user_id, event_id,  booking_date, status } = req.body;
    const booking = { user_id, event_id,  booking_date, status };
    const validation = validateFields(booking, ["user_id", "event_id", "booking_date", "status"]);
    if (!validation.valid) {
        return resp.send(apiError(`Missing or invalid value for: ${validation.missingField}`));
    }

    db.query(
        "INSERT INTO booking (user_id, event_id, booking_date, status) VALUES (?, ?, ?, ?)",
        [user_id, event_id,  booking_date, status],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            resp.send(apiSuccess({ id: result.insertId, ...booking }));
        }
    );
});
 */
router.post("/", (req, resp) => {
    const { user_id } = req.body;

    // Validate user_id only, since event_id is removed
    const validation = validateFields({ user_id }, ["user_id"]);
    if (!validation.valid) {
        return resp.send(apiError(`Missing or invalid value for: ${validation.missingField}`));
    }

    // Use current date on server side
    const booking_date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    const status = "pending";

    db.query(
        "INSERT INTO booking (user_id, booking_date, status) VALUES (?, ?, ?)",
        [user_id, booking_date, status],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            // Return the newly created booking id and other info
            resp.send(apiSuccess({ id: result.insertId, user_id, booking_date, status }));
        }
    );
});


// PUT update booking
router.put("/:id", (req, resp) => {
    const { user_id, event_id,  booking_date, status } = req.body;
    const booking = { user_id, event_id, booking_date, status };

    if (!validateFields(booking, ["user_id", "event_id",  "booking_date", "status"])) {
        return resp.send(apiError("All booking fields are required for update"));
    }

    db.query(
        "UPDATE booking SET user_id=?, event_id=?,  booking_date=?, status=? WHERE id=?",
        [user_id, event_id,  booking_date, status, req.params.id],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.affectedRows !== 1) return resp.send(apiError("Update failed"));
            resp.send(apiSuccess("Booking updated successfully"));
        }
    );
});

// DELETE booking by ID
router.delete("/:id", (req, resp) => {
    db.query("DELETE FROM booking WHERE id=?", [req.params.id], (err, result) => {
        if (err) return resp.send(apiError(err));
        if (result.affectedRows !== 1) return resp.send(apiError("Delete failed"));
        resp.send(apiSuccess("Booking deleted successfully"));
    });
});

module.exports = router;
