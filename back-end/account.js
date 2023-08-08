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

router.get('/', auth, function (req, res){
    const { userId } = req.decoded;
    const sql = "SELECT * FROM user WHERE id = ?";
    connection.query(sql, [userId], function (err, result){
        if(err){
            res.status(404).json({error: "query 에러입니다."});
        } else {
            const accesstoken = result[0].accesstoken;
            const userSeqNo = result[0].userseqno;
            const sendData = {
                user_seq_no: userSeqNo,
            };
            const option = {
                method: "GET",
                url: "https://testapi.openbanking.or.kr/v2.0/user/me",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    Authorization: `Bearer ${accesstoken}`,
                },
                params: sendData,
            };
            axios(option).then(({ data }) => {
                res.json(data);
            });
        }
    })
})

function generateRandom9DigitNumber() {
    const min = 100000000; // Minimum value (smallest 9-digit number)
    const max = 999999999; // Maximum value (largest 9-digit number)

    const random9DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return random9DigitNumber.toString();
}

function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const currentDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return currentDateTime;
}

const genTrasId = () => {
    return process.env.CLIENT_NOCLIENT_NO + generateRandom9DigitNumber();
};

router.post('/balance', auth, function (req, res){

    const { userId } = req.decoded;
    const fintechUseNum = req.body.fintechusenum;

    const sql = "SELECT * FROM user WHERE id = ?";

    connection.query(sql, [userId], function (err, result) {
        const accesstoken = result[0].accesstoken;
        const sendObj = {
            bank_tran_id: genTrasId(),
            fintech_use_num: fintechUseNum,
            tran_dtime: getCurrentDateTime(),
        };
    
        const option = {
            method: "GET",
            url: "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Authorization: `Bearer ${accesstoken}`,
            },
            params: sendObj,
        };
    
        axios(option).then(({ data }) => {
            res.json(data);
        });
    });
})

router.post('/transaction', auth, function (req, res){

    const { userId } = req.decoded;
    const fintechUseNum = req.body.fintechusenum;

    const sql = "SELECT * FROM user WHERE id = ?";

    connection.query(sql, [userId], function (err, result) {
        const accesstoken = result[0].accesstoken;
        const sendObj = {
            bank_tran_id: genTrasId(),
            fintech_use_num: fintechUseNum,
            inquiry_type: "A",
            inquiry_base: "D",
            from_date: "20230101",
            to_date: "20230101",
            sort_order: "D",
            tran_dtime: getCurrentDateTime()
        };
    
        const option = {
            method: "GET",
            url: "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Authorization: `Bearer ${accesstoken}`,
            },
            params: sendObj,
        };
    
        axios(option).then(({ data }) => {
            res.json(data.res_list);
        });
    });
})

router.post('/withdraw', auth, function (req, res){

    const { userId } = req.decoded;
    const fintechUseNum = req.body.fintechusenum;
    const amount = req.body.amount;

    const sql = "SELECT * FROM user WHERE id = ?";

    connection.query(sql, [userId], function (err, result) {
        const accesstoken = result[0].accesstoken;
        const data = {
            bank_tran_id: genTrasId(),
            cntr_account_type: "N",
            cntr_account_num: "100000000001",
            dps_print_content: "쇼핑몰환불",
            fintech_use_num: fintechUseNum,
            tran_amt: amount,
            tran_dtime: getCurrentDateTime(),
            req_client_name: "권기현",
            req_client_fintech_use_num: fintechUseNum,
            req_client_num: "HONG1234",
            transfer_purpose: "ST",
            recv_client_name: "김오픈",
            recv_client_bank_code: "097",
            recv_client_account_num: "100000000001",
        };
    
        const option = {
            method: "POST",
            url: "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
            data: data,
          };
    
        axios(option).then(({ data }) => {
            res.json(data);
        });
    });
})

router.post('/deposit', function (req, res){

    const fintechUseNum = req.body.fintechusenum;
    const tofintechNum = req.body.tofintechnum;
    const amount = req.body.amount;

    access_option = {
        method: "POST",
        url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: {
            client_id:process.env.CLIENT_ID,
            client_secret:process.env.CLIENT_SECRET,
            scope:"oob",
            grant_type:"client_credentials"
        }
    }

    axios(access_option).then(({ data }) => {
        const twoLeggedToken = data.access_token;
        const two_data = {
            cntr_account_type: "N",
            cntr_account_num: "200000000001",
            wd_pass_phrase: "NONE",
            wd_print_content: "환불금액",
            name_check_option: "off",
            tran_dtime: getCurrentDateTime(),
            req_cnt: "1",
            req_list: [
                {
                    tran_no: "1",
                    bank_tran_id: genTrasId(),
                    fintech_use_num: tofintechNum,
                    print_content: "쇼핑몰환불",
                    tran_amt: amount,
                    req_client_name: "권기현",
                    req_client_fintech_use_num: fintechUseNum,
                    req_client_num: "HONG1234",
                    transfer_purpose: "ST",
                },
            ],
        };
        const option = {
            method: "POST",
            url: "https://testapi.openbanking.or.kr/v2.0/transfer/deposit/fin_num",
            headers: {
            Authorization: `Bearer ${twoLeggedToken}`,
            },
            data: two_data,
        };

        axios(option).then(({ data }) => {
            res.json(data);
        });
    });
})

module.exports = router;