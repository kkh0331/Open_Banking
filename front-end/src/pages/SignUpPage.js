import React, { useState } from 'react';
import AppHeader from '../components/common/AppHeader';
import '../components/common/login.css'
import axios from 'axios';

const SignUpPage = () => {

  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [passwordText2, setPasswordText2] = useState("");

  const handleNameChange = (e) => {
    setNameText(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmailText(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordText(e.target.value);
  }

  const handlePassword2Change = (e) => {
    setPasswordText2(e.target.value);
  }

  const handleSignUpButtonClick = () => {
    if(nameText === "" || emailText === "" || passwordText === "" || passwordText2 === ""){
      return alert("모든 항목을 입력해주세요");
    }
    if(passwordText !== passwordText2){
      return alert("입력하신 두 비밀번호가 일치해야 합니다.");
    }
    const option = {
      url:"http://localhost:8000/signup",
      method: "POST",
      data: {
          name : nameText,
          email : emailText,
          password : passwordText
      }
    }
    axios(option)
        .then((response) => {
            console.log(response);
            window.location.href = `/login`;
        })
        .catch((error)=>{
            console.log(error);
            alert(`회원가입 실패!!\n${error.response.data.error}`);
        })
  }

  return (
    <div>
        <AppHeader title={"Sign Up Page"}></AppHeader>
        <h1 className='h1_login_title'>Sign Up</h1>
        <div className='div_login_input_background'>
            <div className='div_login_text'>이름</div>
            <input className='input_login_text' onChange={handleNameChange}></input>
            <div className='div_login_text'>이메일 아이디</div>
            <input className='input_login_text' onChange={handleEmailChange}></input>
            <div className='div_login_text'>비밀번호</div>
            <input className='input_login_text' type='password' onChange={handlePasswordChange}></input>
            <div className='div_login_text'>비밀번호 확인</div>
            <input className='input_login_text' type='password' onChange={handlePassword2Change}></input>
            <button className='button_background' style={{width:"300px"}} onClick={handleSignUpButtonClick}>회원가입</button>
        </div>
    </div>
  );
};

export default SignUpPage;