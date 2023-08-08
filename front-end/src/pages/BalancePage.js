import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "../components/common/AppHeader";
import queryString from "query-string";
import axios from "axios";
import '../components/common/login.css';
import BalanceCard from "../components/balance/BalanceCard";
import TransactionList from "../components/balance/TransactionList";

const BalancePage = () => {

  const [balance, setBalance] = useState("아직없음");
  const [transactionList, setTransactionList] = useState([]);

  const queryParams = useLocation().search;
  const parsed = queryString.parse(queryParams);
  const fintechUseNum = parsed.fintechUseNo;

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    getBalance();
    getTransactionList();
  }, []);

  const getBalance = () => {
    const option = {
        method: "POST",
        url: "http://localhost:8000/account/balance",
        headers: {
            usertoken: userToken
        },
        data: {
            fintechusenum : fintechUseNum
        }
    };
    axios(option).then(({data}) => {
         setBalance(data);
    })
  };

  const getTransactionList = () => {
    const option = {
        method: "POST",
        url: "http://localhost:8000/account/transaction",
        headers: {
            usertoken: userToken
        },
        data: {
            fintechusenum : fintechUseNum
        }
    };
    axios(option).then(({data}) => {
        setTransactionList(data);
    })
  };

  const handleMainPageClick = () => {
    window.location.href = './main';
  }

  return (
    <div>
      <AppHeader title="Balance Check"></AppHeader>
      <div style={{margin:"auto"}}>
        <BalanceCard
            bankName={balance.bank_name}
            fintechNo={balance.fintech_use_num}
            balance={balance.balance_amt}
        ></BalanceCard>
        <TransactionList transactionList={transactionList}></TransactionList>
        <button className='button_background' style={{width:"100%", margin:"10px"}} onClick={handleMainPageClick}>Main Page</button>
      </div>
    </div>
  );
};

export default BalancePage;
