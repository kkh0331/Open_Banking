const router = require('express').Router();
const mysql = require('mysql2');
const axios = require("axios");
require('dotenv').config();
const auth = require("./lib/auth");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

router.post('/result', auth, function (req, res){
    const access_token = req.body.accesstoken;
    const user_seq_no = req.body.userseqno;
    const {userId} = req.decoded;
    const sql = "UPDATE user SET accesstoken = ?, userseqno = ? WHERE id = ?"
    connection.query(sql, [access_token, user_seq_no, userId], function (err, result){
        if(err){
            res.status(404).json({error: "query 에러입니다."});
        } else {
            res.json("성공");
        }
    })
})

module.exports = router;