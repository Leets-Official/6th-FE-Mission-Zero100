import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const [status, setStatus] = useState('loading'); 

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (!code) {
        console.error('인증 코드가 없습니다.');
        setStatus('error');
        return;
      }

      try {
        console.log("백엔드로 코드 전송:", code);
      
        const response = await api.get(`/auth/kakao/redirect`, {
          params: { code: code },
          _skipErrorHandler: true 
        });

        console.log("백엔드 응답:", response);

        const responseData = response.data;
        
        // 토큰이 있는 경우 -> 로그인 성공
        let accessToken = null;
        let refreshToken = null;

        // 다양한 응답 구조 처리
        if (responseData.data?.accessToken) {
          accessToken = responseData.data.accessToken;
          refreshToken = responseData.data.refreshToken;
        } else if (responseData.accessToken) {
          accessToken = responseData.accessToken;
          refreshToken = responseData.refreshToken;
        }

        if (accessToken) {
          // 토큰 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          console.log("로그인 성공 - 토큰 저장 완료");
          setStatus('success');

          setTimeout(() => {
           navigate('/todo', { replace: true});
          }, 500);
        } else {
          // 토큰이 없으면 회원가입 필요 -> 정상적인 성공 응답이지만 토큰이 없는 경우
          console.log("회원가입이 필요합니다.");
          setStatus('signup_needed');
          setTimeout(() => {
            navigate('/signup', { state: { kakaoData: responseData } });
          }, 1500);
        }

      } catch (error) {
        console.error("카카오 로그인 처리 중 에러:", error);
      
        if (error.response?.status === 401) {
          console.log("401 에러 - 회원가입 필요");
          setStatus('signup_needed');
          setTimeout(() => {
            navigate('/signup', { 
              state: { 
                kakaoData: error.response?.data,
                needsSignup: true 
              } 
            });
          }, 1500);
        } else {
          setStatus('error');
          console.error("에러 상세:", error.response?.data || error.message);
        }
      }
    };

    handleKakaoLogin();
  }, [code, navigate]); 

  
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">카카오 로그인 처리 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2">로그인 성공!</h2>
          <p className="text-gray-600">Todo 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'signup_needed') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">회원가입이 필요합니다</h2>
          <p className="text-gray-600">회원가입 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">✕</div>
          <h2 className="text-xl font-semibold mb-2">로그인 처리 중 오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">다시 시도해주세요</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default KakaoRedirect;