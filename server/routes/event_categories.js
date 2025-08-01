const express = require("express");
const router = express.Router();
const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");

// GET all categories
router.get("/", (req, res) => {
  db.query("SELECT * FROM event_categories", (err, results) => {
    if (err) return res.send(apiError(err));
    res.send(apiSuccess(results));
  });
});

// GET category by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM event_categories WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.send(apiError(err));
    if (results.length === 0) return res.send(apiError("Category not found"));
    res.send(apiSuccess(results[0]));
  });
});

// POST new category
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.send(apiError("Name is required"));

  db.query("INSERT INTO event_categories (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.send(apiError(err));
    res.send(apiSuccess({ id: result.insertId, name }));
  });
});

// DELETE category
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM event_categories WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.send(apiError(err));
    if (result.affectedRows === 0) return res.send(apiError("Category not found"));
    res.send(apiSuccess("Category deleted successfully"));
  });
});

module.exports = router;
