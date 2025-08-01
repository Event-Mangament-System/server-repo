const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const { createToken } = require("../utils/jwtauth");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// GET /users/:id
router.get("/:id", (req, resp) => {
    db.query("SELECT * FROM users WHERE id=?", [req.params.id], (err, results) => {
        if (err) return resp.send(apiError(err));
        if (results.length !== 1) return resp.send(apiError("User not found"));
        return resp.send(apiSuccess(results[0]));
    });
});

// POST /users/signin
router.post("/signin", (req, resp) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {
        if (err) return resp.send(apiError(err));
        if (results.length !== 1) return resp.send(apiError("Invalid email"));

        const dbUser = results[0];
        const isMatching = bcrypt.compareSync(password, dbUser.password);
        if (!isMatching) return resp.send(apiError("Invalid password"));

        const token = createToken(dbUser);
        resp.send(apiSuccess({ ...dbUser, token }));
    });
});

// POST /users/signup
router.post("/signup", (req, resp) => {
    const { username, email, phone, password, address } = req.body;

    if (!password) return resp.send(apiError("Password is required"));

    const encPasswd = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users (username, email, phone, password, address) VALUES (?, ?, ?, ?, ?)",
        [username, email, phone, encPasswd, address],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.affectedRows === 1) {
                db.query("SELECT * FROM users WHERE id=?", [result.insertId], (err, results) => {
                    if (err) return resp.send(apiError(err));
                    resp.send(apiSuccess(results[0]));
                });
            }
        }
    );
});

// PUT /users/:id
router.put("/:id", (req, resp) => {
    const { username, email, phone, password, address } = req.body;

    if (!password) return resp.send(apiError("Password is required"));

    const encPasswd = bcrypt.hashSync(password, 10);

    db.query(
        "UPDATE users SET username=?, email=?, phone=?, password=?, address=? WHERE id=?",
        [username, email, phone, encPasswd, address, req.params.id],
        (err, results) => {
            if (err) return resp.send(apiError(err));
            if (results.affectedRows !== 1) return resp.send(apiError("User not found or no change in data"));
            return resp.send(apiSuccess("User updated"));
        }
    );
});

// DELETE /users/:id
router.delete("/:id", (req, resp) => {
    db.query("DELETE FROM users WHERE id=?", [req.params.id], (err, results) => {
        if (err) return resp.send(apiError(err));
        if (results.affectedRows !== 1) return resp.send(apiError("User not found"));
        return resp.send(apiSuccess("User deleted"));
    });
});

// PATCH /users/changepasswd
router.patch("/changepasswd", (req, resp) => {
    const { id, password } = req.body;

    if (!password) return resp.send(apiError("Password is required"));

    const encPasswd = bcrypt.hashSync(password, 10);

    db.query("UPDATE users SET password=? WHERE id=?", [encPasswd, id], (err, result) => {
        if (err) return resp.send(apiError(err));
        if (result.affectedRows !== 1) return resp.send(apiError("User not found"));
        resp.send(apiSuccess("User password updated"));
    });
});

module.exports = router;
