const express = require("express");
const router = express.Router();
const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const { validateFields } = require("../utils/validation");

// GET all subcategories with their category name
router.get("/", (req, res) => {
  const sql = `
    SELECT es.*, ec.name AS category_name
    FROM event_subcategories es
    JOIN event_categories ec ON es.category_id = ec.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.send(apiError(err));
    res.send(apiSuccess(results));
  });
});

// GET subcategory by ID
/* router.get("/:id", (req, res) => {
  const sql = `
    SELECT es.*, ec.name AS category_name
    FROM event_subcategories es
    JOIN event_categories ec ON es.category_id = ec.id
    WHERE es.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.send(apiError(err));
    if (results.length === 0) return res.send(apiError("Subcategory not found"));
    res.send(apiSuccess(results[0]));
  });
}); */

// GET all subcategories by category ID
router.get("/category/:categoryId", (req, res) => {
  const sql = `
    SELECT es.*, ec.name AS category_name
    FROM event_subcategories es
    JOIN event_categories ec ON es.category_id = ec.id
    WHERE es.category_id = ?
  `;
  db.query(sql, [req.params.categoryId], (err, results) => {
    if (err) return res.send(apiError(err));
    // Even if no subcategories found, send success with empty array
    res.send(apiSuccess(results));
  });
});





// POST new subcategory (already given)
router.post("/", (req, res) => {
  const { category_id, sub_category, price } = req.body;

  const validation = validateFields(req.body, ["category_id", "sub_category", "price"]);
  if (!validation.valid)
    return res.send(apiError(`${validation.missingField} is required`));

  if (isNaN(category_id) || Number(category_id) <= 0)
    return res.send(apiError("category_id must be a positive number"));

  if (typeof sub_category !== "string" || sub_category.trim() === "")
    return res.send(apiError("sub_category must be a non-empty string"));

  if (isNaN(price) || Number(price) <= 0)
    return res.send(apiError("price must be a positive number"));

  db.query(
    "INSERT INTO event_subcategories (category_id, sub_category, price) VALUES (?, ?, ?)",
    [Number(category_id), sub_category.trim(), Number(price)],
    (err, result) => {
      if (err) return res.send(apiError(err));
      res.send(apiSuccess({
        id: result.insertId,
        category_id: Number(category_id),
        sub_category: sub_category.trim(),
        price: Number(price)
      }));
    }
  );
});

// PUT update subcategory by ID
router.put("/:id", (req, res) => {
  const { category_id, sub_category, price } = req.body;

  const validation = validateFields(req.body, ["category_id", "sub_category", "price"]);
  if (!validation.valid)
    return res.send(apiError(`${validation.missingField} is required`));

  if (isNaN(category_id) || Number(category_id) <= 0)
    return res.send(apiError("category_id must be a positive number"));

  if (typeof sub_category !== "string" || sub_category.trim() === "")
    return res.send(apiError("sub_category must be a non-empty string"));

  if (isNaN(price) || Number(price) <= 0)
    return res.send(apiError("price must be a positive number"));

  db.query(
    "UPDATE event_subcategories SET category_id=?, sub_category=?, price=? WHERE id=?",
    [Number(category_id), sub_category.trim(), Number(price), req.params.id],
    (err, result) => {
      if (err) return res.send(apiError(err));
      if (result.affectedRows === 0)
        return res.send(apiError("Subcategory not found"));
      res.send(apiSuccess("Subcategory updated successfully"));
    }
  );
});

// DELETE subcategory by ID
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM event_subcategories WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.send(apiError(err));
    if (result.affectedRows === 0)
      return res.send(apiError("Subcategory not found"));
    res.send(apiSuccess("Subcategory deleted successfully"));
  });
});

module.exports = router;
