import React from "react";
import AppHeader from "../components/common/AppHeader";
import { QRCodeSVG } from "qrcode.react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const QRBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
`;

const handleMainPageClick = () => {
    window.location.href = './main';
}

const QrCodePage = () => {
  const queryParams = useLocation().search;
  const parsed = queryString.parse(queryParams);
  const fintechUseNum = parsed.fintechUseNo;

  return (
    <div>
      <AppHeader title={"QR 코드"} />
      <div style={{width:"300px", margin:"auto", marginTop:"50px"}}>
        <QRBlock>
            <QRCodeSVG value={fintechUseNum} size={256} />
        </QRBlock>
        <button className='button_background' style={{width:"300px", marginTop:"20px"}} onClick={handleMainPageClick}>Main Page</button>
      </div>
    </div>
  );
};

export default QrCodePage;
