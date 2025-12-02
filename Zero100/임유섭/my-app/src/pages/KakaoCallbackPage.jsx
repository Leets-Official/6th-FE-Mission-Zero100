// src/pages/KakaoCallbackPage.jsx

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Text from "../components/Text";
import { kakaoRedirect } from "../api/authApi";
export default function KakaoCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const code = new URLSearchParams(location.search).get("code");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["kakaoRedirect", code],
    queryFn: () => kakaoRedirect(code),
    enabled: !!code, // code 있을 때만 호출
  });

  useEffect(() => {
    if (!data) return; 

   
    if (data.code === 200) {
      alert(data.responseMessage || "카카오 로그인 완료");
      navigate("/todo", { replace: true });
      return;
    }

    if (data.code === 401) {
      navigate("/signup?from=kakao", { replace: true });
      return;
    }

    alert(data.responseMessage || data.message || "카카오 로그인에 실패했습니다.");
    navigate("/login", { replace: true });
  }, [data, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text as="p">카카오 로그인 처리 중입니다...</Text>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className="flex items-center justify-center h-screen">
        <Text as="p">카카오 로그인 중 오류가 발생했습니다.</Text>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Text as="p">결과 처리 중입니다...</Text>
    </div>
  );
}