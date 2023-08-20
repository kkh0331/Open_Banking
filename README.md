# Open Banking
- 'FINTECH ACADEMY 핀테크 서비스 개발 과정 오픈뱅킹 기반 간편결제/지급결제' 했던 내용을 기반으로 만든 개인 프로젝트
- 교육 일시 : 2023.07.31 ~ 2023.08.04

# Open Banking Implementation Project
- 오픈뱅킹 API 활용을 실습하기 위한 프로젝트
- 참고 자료 : [금융결제원 오픈API 개발자사이트](https://developers.kftc.or.kr/dev/doc/open-banking)
- 사용자인증(OAuth 2.0) 사용자인증 & 토큰발급 API
- 사용자/계좌관리 사용자정보조회 API
- 조회서비스(사용자) 잔액조회 & 거래내역조회 API
- 이체서비스 출금이체 & 입금이체 API
- Main Page Capture Image<br>
<img width="624" alt="main_image" src="https://github.com/kkh0331/Open_Banking/assets/99806443/9fe50fb2-a2af-4def-88e0-658dad57a1e8"><br>
[시연영상을 보실려면 여기를 클릭해주세요](https://www.youtube.com/watch?v=2zgDpbHXq-g)

# 구현을 위해 추가해야 할 사항
- back-end > .env : HASH_SECRET, HASH_METHOD, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, USER_TOKEN_KEY, CLIENT_ID, CLIENT_SECRET, CLIENT_NO 추가
- front-end > .env : REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET 추가

# Functions
- 로그인
- 오픈 API 활용
- 암호화 알고리즘

# 프로젝트 Architecture
Front-end<br>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/><br>
Back-end<br>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/><br>
Database<br>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/><br>
Cloud & Hosting : Local host로 작업<br>
Tools<br>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/><br>
