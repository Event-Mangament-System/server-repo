const express = require("express");
const router = express.Router();
const db = require("../utils/dbpool");

// GET all feedback
router.get("/", (req, res) => {
  db.query("SELECT * FROM customer_feedback ORDER BY feedback_date DESC", (err, results) => {
    if (err) {
      console.error("Error fetching feedback:", err);
      return res.status(500).json({ error: err.code, message: err.sqlMessage });
    }
    res.json(results);
  });
});

// POST feedback
router.post("/", (req, res) => {
  console.log("Received body:", req.body); // debug
  const { user_id,  rating, comment } = req.body;

  if (!user_id ||  !rating) {
    return res.status(400).json({ message: "user_id,  and rating are required" });
  }

  const sql = "INSERT INTO customer_feedback (user_id,  rating, comment, feedback_date) VALUES (?,  ?, ?, NOW())";
  db.query(sql, [user_id,  rating, comment || null], (err, result) => {
    if (err) {
      console.error("Error adding feedback:", err);
      return res.status(500).json({ error: err.code, message: err.sqlMessage });
    }
    res.status(201).json({ message: "Feedback added", feedback_id: result.insertId ,result});
  });
});

// DELETE feedback by ID
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM customer_feedback WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Error deleting feedback:", err);
      return res.status(500).json({ error: err.code, message: err.sqlMessage });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted" });
  });
});

module.exports = router;
