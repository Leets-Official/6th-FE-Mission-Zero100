// src/pages/KakaoCallbackPage.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { kakaoRedirect } from "../api/authApi";

export default function KakaoCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 에서 ?code=... 꺼내기
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  // 인가 코드가 없으면 바로 에러 문구
  if (!code) {
    return <div>인가 코드가 없습니다. 다시 로그인해 주세요.</div>;
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["kakaoRedirect", code],
    queryFn: () => kakaoRedirect(code),
    enabled: !!code,
    retry: false,
  });

  // 👉 에러가 났을 때 과제 스펙 처리
  useEffect(() => {
    if (!isError || !error) return;

    const status = error?.response?.status;

    // 6-1. 회원가입 필요 -> code 401
    if (status === 401) {
      navigate("/signup?from=kakao", { replace: true });
      return;
    }

    // 그 외 상태코드는 일단 콘솔에 찍어두기
    console.log("카카오 리다이렉트 에러", status, error?.response?.data);
  }, [isError, error, navigate]);

  // 👉 성공 시 TODO 페이지로 이동
  useEffect(() => {
    if (!data) return;

    // 7. 로그인/회원가입 성공 -> code 200 으로 왔다고 가정
    navigate("/todos", { replace: true });
  }, [data, navigate]);

  if (isLoading) {
    return <div>카카오 로그인 처리 중...</div>;
  }

  // 401인 경우에는 위 useEffect에서 /signup 으로 이동하면서 여기 렌더는 거의 안 보일 거고,
  // 401이 아닌 다른 에러는 아래 메시지가 보이게 된다.
  if (isError) {
    const status = error?.response?.status;
    return (
      <div>
        로그인 중 오류가 발생했습니다. (status: {status ?? "알 수 없음"})
      </div>
    );
  }

  // data 가 도착하면 위 useEffect에서 /todos 로 이동하므로 여기도 거의 안 보임
  return <div>카카오 로그인 처리 중...</div>;
}
