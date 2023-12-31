import React from "react";
import styled from "styled-components";

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  padding: 20px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FintechUseNo = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
`;

const QrButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #60584c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  font-weight:bold;
  &:hover {
    background-color: #21428f;
  }
`;

const BalanceButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #ffb437;
  color: white;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  font-weight:bold;
  &:hover {
    background-color: #ae4a23;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const MainAccountCard = ({ bankName, fintechUseNo }) => {
  const handleQrButton = () => {
    console.log("QR 버튼 클릭");
    window.location.href = `/qrcode?fintechUseNo=${fintechUseNo}`;
  };

  const handleBalanceButton = () => {
    console.log("잔액조회 버튼 클릭");
    window.location.href = `/balance?fintechUseNo=${fintechUseNo}`;
  };

  return (
    <CardBlock>
      <CardTitle>{bankName}</CardTitle>
      <FintechUseNo>{fintechUseNo}</FintechUseNo>
      <ButtonBlock>
        <QrButton onClick={handleQrButton}>QR 코드</QrButton>
        <BalanceButton onClick={handleBalanceButton}>잔액 조회</BalanceButton>
      </ButtonBlock>
    </CardBlock>
  );
};

export default MainAccountCard;
