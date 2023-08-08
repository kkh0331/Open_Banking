import React, { useEffect, useState } from 'react';
import AppHeader from '../components/common/AppHeader';
import '../components/common/login.css';
import axios from 'axios';

const MainPage = () => {
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

  const handleAccountWithdrawClick = () => {
    window.location.href="./qrreader"
  }

  const handleAccountListButtonClick = () => {
    window.location.href="./account";
  }

  return (
    <div>
      <AppHeader title={"User Selection"}></AppHeader>
      <div className='div_login_input_background' style={{marginTop:"100px"}}>
        <div className='div_login_text'>
            <p className='p_auth_text'>
                <span style={{fontSize:"40px", color:"#ffb437", fontWeight:"bold"}}>{userName}</span>님,
            </p>
            <p className='p_auth_text'>원하는 기능을 선택해주세요.</p>
        </div>
        <button className='button_background2' onClick={handleAccountWithdrawClick}>계좌 이체</button><br/>
        <button className='button_background2' onClick={handleAccountListButtonClick}>계좌 목록 조회</button>
      </div>
    </div>
  );
};

export default MainPage;