const router = require('express').Router();
const mysql = require('mysql2');
let crypto = require("crypto");
require('dotenv').config();
let jwt = require("jsonwebtoken");
const auth = require("./lib/auth");

const tokenKey = process.env.USER_TOKEN_KEY;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

router.get('/name/', auth, function (req, res){
    const {userId} = req.decoded;
    const sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql, [userId], function (err, result){
        if(err){
            res.status(404).json({error: "query 에러입니다."});
        } else {
            res.json(result[0].name);
        }
    })
})

module.exports = router;