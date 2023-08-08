import React, { useEffect, useState } from 'react';
import AppHeader from '../components/common/AppHeader';
import '../components/common/login.css';
import axios from 'axios';

const AuthPage = () => {
    const userToken = localStorage.getItem("userToken");
    const [userName, setUserName] = useState("");
        
    useEffect(() => {
        getUserName();
    }, []);

    const getUserName = () => {
        const option = {
            method: "GET",
            url: "http://localhost:8000/user/name",
            headers: {
                usertoken: userToken
            }
        };
        axios(option).then(({data}) => {
            setUserName(data);
        })
    }

    const handleAccessTokenRequestButtonClick = () => {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        window.location.href = `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=http://localhost:3000/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0`;
    }

    return (
        <div>
            <AppHeader title={"Access Token Request"}></AppHeader>
            <div className='div_login_input_background' style={{marginTop:"150px"}}>
                <div className='div_login_text'>
                    <p className='p_auth_text'>
                        <span style={{fontSize:"40px", color:"#ffb437", fontWeight:"bold"}}>{userName}</span>님,
                    </p>
                    <p className='p_auth_text'>계좌를 조회할 수 있는</p>
                    <p className='p_auth_text'>Access Token이 없습니다.</p>
                </div>
                <button className='button_background' style={{width:"300px"}} onClick={handleAccessTokenRequestButtonClick}>Access Token Request</button>
            </div>
        </div>
    );
};

export default AuthPage;