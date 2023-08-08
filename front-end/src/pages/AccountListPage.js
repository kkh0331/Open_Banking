import React, { useEffect, useState } from 'react'
import AppHeader from '../components/common/AppHeader';
import axios from 'axios';
import MainAccountCard from '../components/main/MainAccountCard';

const AccountListPage = () => {

    const [accountList, setAccountList] = useState([]);
    const userToken = localStorage.getItem("userToken");

    useEffect(()=>{
        getAccountList();
    }, []);

    const getAccountList = () => {
        const option = {
            method: "GET",
            url: "http://localhost:8000/account",
            headers: {
                usertoken: userToken
            }
        };
        axios(option).then(({data}) => {
            setAccountList(data.res_list);
        })
    }

    return (
        <div>
            <AppHeader title={"Account List"}></AppHeader>
            {accountList.map((account) => {
                return (
                    <>
                        <MainAccountCard
                            bankName={account.bank_name}
                            fintechUseNo={account.fintech_use_num}
                        ></MainAccountCard>
                    </>
                );
            })}
        </div>
    );
};

export default AccountListPage;