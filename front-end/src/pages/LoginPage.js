import React, { useState } from 'react';
import AppHeader from '../components/common/AppHeader';
import axios from 'axios';
import '../components/common/login.css';

const LoginPage = () => {

    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value);
    }

    const handleSignUpButtonClick = () => {
        window.location.href = `/signup`;
    }

    const handleLoginButtonClick = () => {
        if(emailText === "" || passwordText === ""){
            return alert("모든 항목을 입력해주세요");
        }
        const option = {
            url:"http://localhost:8000/login",
            method: "POST",
            data: {
                email : emailText,
                password : passwordText
            }
        }
        axios(option)
            .then((response) => {
                localStorage.setItem("userToken",response.data);
                window.location.href = "/auth";
            })
            .catch((error)=>{
                console.log(error);
                alert(`로그인에 실패!!\n${error.response.data.error}`);
            })
    };

    return (
        <div>
            <AppHeader title={"Private Project"}></AppHeader>
            <h1 className='h1_login_title'>Open Banking</h1>
            <div className='div_login_input_background'>
                <div className='div_login_text'>이메일 아이디</div>
                <input className='input_login_text' onChange={handleEmailChange}></input>
                <div className='div_login_text'>비밀번호</div>
                <input className='input_login_text' type='password' onChange={handlePasswordChange}></input>
                <button className='button_background' onClick={handleSignUpButtonClick} style={{marginRight:"20px"}}>회원가입</button>
                <button className='button_background' onClick={handleLoginButtonClick}>로그인</button>
            </div>
        </div>
    );
};

export default LoginPage;