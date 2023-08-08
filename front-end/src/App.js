import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AuthPage from './pages/AuthPage';
import AuthResultPage from './pages/AuthResultPage';
import MainPage from './pages/MainPage';
import AccountListPage from './pages/AccountListPage';
import BalancePage from './pages/BalancePage';
import QrCodePage from './pages/QrCodePage';
import QrReaderPage from './pages/QrReaderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/auth' element={<AuthPage/>}></Route>
        <Route path='/authResult' element={<AuthResultPage/>}></Route>
        <Route path='/main' element={<MainPage/>}></Route>
        <Route path='/account' element={<AccountListPage/>}></Route>
        <Route path="/balance" element={<BalancePage/>}></Route>
        <Route path="/qrcode" element={<QrCodePage/>}></Route>
        <Route path="/qrreader" element={<QrReaderPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
