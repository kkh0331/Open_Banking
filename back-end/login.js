const router = require('express').Router();
const mysql = require('mysql2');
let crypto = require("crypto");
require('dotenv').config();
let jwt = require("jsonwebtoken");

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
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT * FROM user WHERE email = ?"
    connection.query(sql, [email], function (err1, result){
        if(err1) res.status(404).json({ error: "query 에러입니다." });
        if(result.length === 0){
            res.status(404).json({ error: "등록되지 않은 사용자입니다." });
        } else {
            const dbPassword = result[0].password;
            const hashPassword = hash(password);
            if(dbPassword === hashPassword){
                const tokenKey = process.env.USER_TOKEN_KEY;
                jwt.sign(
                    {
                        userId: result[0].id,
                        userEmail: result[0].email
                    },
                    tokenKey,
                    {
                        expiresIn: "5d",
                        issuer: "fintech.admin",
                        subject: "user.login.info",
                    },
                    function (err2, token){
                        if(err2){
                            res.status(404).json({ error: "token화 오류입니다." });
                            
                        }
                        res.json(token);
                    }
                );
            } else {
                res.status(404).json({ error: "비밀번호가 일치하지 않습니다." });
            }
        }
    })
})

module.exports = router;