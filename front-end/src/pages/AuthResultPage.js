import React, { useEffect } from 'react';
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import axios from 'axios';

const AuthResultPage = () => {
    const queryParams = useLocation().search;
    const parsed = queryString.parse(queryParams);
    const authCode = parsed.code;

    const userToken = localStorage.getItem("userToken");
    
    useEffect(() => {
        postAccessToken();
    }, []);

    const postAccessToken = () => {
        const option = {
            url: "/oauth/2.0/token",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            data: {
                code: authCode,
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                redirect_uri: "http://localhost:3000/authResult",
                grant_type: "authorization_code",
            },
        };
        axios(option).then(({data}) => {
            const access_token = data.access_token;
            const user_seq_no = data.user_seq_no;
            sendAccessTokenToServer({access_token, user_seq_no})
        });
    }

    const sendAccessTokenToServer = ({access_token, user_seq_no}) =>{
        const option = {
            url: "http://localhost:8000/auth/result",
            method: "POST",
            headers: {
                usertoken: userToken
            },
            data:{
                accesstoken: access_token,
                userseqno: user_seq_no
            }
        };
        axios(option).then((response)=>{
            window.location.href = `/main`;
        })
    }

    return (
        <></>
    );
};

export default AuthResultPage;