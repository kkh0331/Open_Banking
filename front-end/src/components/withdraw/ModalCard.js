import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const ModalCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  padding: 20px;
  border: 1px #112211 solid;
`;
const CardTitle = styled.div`
  font-size: 1rem;
  color: black;
`;
const FintechUseNo = styled.div`
  font-size: 0.7rem;
  margin-bottom: 30px;
`;

const WithDrawButton = styled.button`
  border: none;
  padding: 0.3rem;
  background: #60584c;
  font-weight:bold;
  font-size:15px;
  color: white;
  margin-top: 0.3rem;
`;

const ModalCard = ({ bankName, fintechUseNo, tofintechno }) => {
  const [amount, setamount] = useState("");
  const userToken = localStorage.getItem("userToken");

  const handlePayButtonClick = () => {
    const option = {
      method: "POST",
      url: "http://localhost:8000/account/withdraw",
      headers: {
          usertoken: userToken
      },
      data: {
        fintechusenum : fintechUseNo,
        amount : amount
      }
    };
    axios(option).then(({data}) => {
        console.log(data);
        if (data.rsp_code === "A0000" || data.rsp_code === "A0015") {
          alert("출금완료 !");
          deposit();
        } else {
          alert("출금실패 !");
        }
    })
  };

  const deposit = () => {
    const option = {
      method: "POST",
      url: "http://localhost:8000/account/deposit",
      data: {
        fintechusenum : fintechUseNo,
        tofintechnum : tofintechno,
        amount : amount
      }
    };
    axios(option).then(({data}) => {
        console.log(data);
        if (data.rsp_code === "A0000" || data.rsp_code === "A0015") {
          alert("입금완료 !");
          window.location.href='/main';
        } else {
          alert("입금실패 !");
        }
    })

  };

  const handleChange = (e) => {
    setamount(e.target.value);
  };

  return (
    <ModalCardBlock>
      <CardTitle>{bankName}</CardTitle>
      <FintechUseNo>{fintechUseNo}</FintechUseNo>
      <p>{tofintechno}로 돈을 보냅니다.</p>
      <input onChange={handleChange}></input>
      <WithDrawButton onClick={handlePayButtonClick}>결제하기</WithDrawButton>
    </ModalCardBlock>
  );
};

export default ModalCard;
