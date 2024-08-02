import React from "react";
import axios from "axios";
import google_logo from "../assets/logo/google_logo.png";
import naver_logo from "../assets/logo/naver_logo.png";
import kakao_logo from "../assets/logo/kakao_logo.png";
import "./LoginPage.css";

const LoginPage = () => {
  const handleLogin = async (provider) => {
    try {
      const redirectUri = "https://localhost:3000/auth/callback"; // 실제 리다이렉트 URI로 변경
      const response = await axios.post(
        `${
          import.meta.env.VITE_TEST_URL
        }/oauth2/authorization/${provider}?redirect_uri=${redirectUri}`
      );
      console.log(response);

      if (response.data && response.data.login_url) {
        window.location.href = response.data.login_url;
      }
    } catch (error) {
      console.error("Login request failed", error);
    }
  };

  return (
    <div className="back">
      <div className="login">
        <h4>일심동책</h4>

        <div className="social_login">
          <p>SNS 간편 로그인</p>
          <div className="social" onClick={() => handleLogin("kakao")}>
            <img src={kakao_logo} alt="kakao_logo" />
          </div>
          <div className="social" onClick={() => handleLogin("naver")}>
            <img src={naver_logo} alt="naver_logo" />
          </div>
          <div className="social" onClick={() => handleLogin("google")}>
            <img src={google_logo} alt="google_logo" />
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;