import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; 

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  const BASE_URL = 'https://blog.leets.land';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: async () => {
      // 정확한 로그 확인을 위해 axios 직접 호출
      console.log("백엔드로 코드 전송 시도:", code);
      const response = await axios.get(`${BASE_URL}/auth/kakao/redirect`, {
        params: { code: code }
      });
      console.log("백엔드 전체 응답:", response);
      return response.data;
    },
    enabled: !!code, // 코드가 있을 때만 실행
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (data) {
      console.log("받은 데이터 구조:", data);

      // Case 1: data.data.accessToken 구조일 때 
      if (data.data && data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        alert("로그인 성공!");
        navigate('/todo');
      }
      // Case 2: data.accessToken 구조일 때 
      else if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        alert("로그인 성공!");
        navigate('/todo');
      }
      // Case 3: 회원가입 필요 (401 에러가 200으로 포장되어 올 경우)
      else if (data.code === 401 || data.httpStatus === "UNAUTHORIZED") {
        alert("회원가입이 필요합니다.");
        navigate('/signup', { state: { kakaoData: data } });
      }
    }
  }, [data, navigate]);

  // 에러 발생 시 처리
  useEffect(() => {
    if (isError) {
      console.error("에러 발생:", error);
      if (error.response && error.response.status === 401) {
        alert("회원가입이 필요합니다. (401 Error)");
        navigate('/signup');
      }
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>로그인 처리 중입니다...</h2>
        <p>코드를 백엔드로 보내고 있습니다.</p>
      </div>
    );
  }

  
  return (
    <div style={{ padding: '20px', wordBreak: 'break-all' }}>
      <h1>현재 상태 디버깅</h1>
      
      {isError ? (
        <div style={{ color: 'red' }}>
          <h3>에러 발생!</h3>
          <p>{error.message}</p>
          <pre>{JSON.stringify(error.response?.data, null, 2)}</pre>
        </div>
      ) : (
        <div style={{ color: 'blue' }}>
          <h3>서버에서 받은 데이터:</h3>
          {/* 받은 데이터를 화면에 그대로 출력 */}
          <pre>{JSON.stringify(data, null, 2)}</pre> 
        </div>
      )}

      <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px' }}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default KakaoRedirect;