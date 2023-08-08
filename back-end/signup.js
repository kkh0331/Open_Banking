const router = require('express').Router();
const mysql = require('mysql2');
let crypto = require("crypto");
require('dotenv').config();
const secret = process.env.HASH_SECRET;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const hash = (input) => {
    return crypto.createHmac(process.env.HASH_METHOD, secret).update(input).digest("hex");
};

router.post('/', function (req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = hash(password);

    let sql = "SELECT * FROM user WHERE email = ?"
    connection.query(sql, [email], function (err1, result1){
        if(err1) res.status(404).json({ error: "query 에러입니다." });
        if(result1.length > 0){
            res.status(404).json({ error: "이미 등록된 사용자입니다." });
        } else {
            sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
            connection.query(sql, [name, email, hashedPassword], function (err2, result){
                if(err2){
                    res.status(404).json({error: "query 에러입니다."});
                } else {
                    res.json("성공적으로 등록 완료!")
                }
            })
        }
    })
})

module.exports = router;