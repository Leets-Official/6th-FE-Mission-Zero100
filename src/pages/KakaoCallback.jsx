import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Text from '../components/common/Text';
import { kakaoLogin } from '../lib/auth';
import { useRef } from 'react';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('카카오 로그인 처리 중입니다...');
  const [errorDetail, setErrorDetail] = useState('');
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true; // StrictMode에서 중복 호출 방지

    const code = new URLSearchParams(location.search).get('code');

    if (!code) {
      setMessage('카카오 인가 코드가 없습니다. 다시 로그인해 주세요.');
      return;
    }

    const process = async () => {
      try {
        await kakaoLogin(code);
        setMessage('로그인 성공! 이동 중...');
        navigate('/todo', { replace: true });
      } catch (err) {
        console.error('Kakao redirect error', err.response?.data || err);
        const status = err.response?.status;
        const serverMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          '카카오 로그인에 실패했습니다.';

        if (status === 401) {
          alert('회원가입이 필요합니다. 정보를 입력해 주세요.');
          navigate('/signup', { replace: true, state: { code } });
          return;
        }

        setMessage('카카오 로그인에 실패했습니다.');
        setErrorDetail(`${serverMessage} (상태코드: ${status || '알 수 없음'})`);
      }
    };

    process();
  }, [location.search, navigate]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-md w-[320px] text-center'>
        <Text as='p' className='text-gray-700'>
          {message}
        </Text>
        {errorDetail && (
          <>
            <p className='mt-3 text-sm text-red-600 break-words'>{errorDetail}</p>
            <button
              type='button'
              className='mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800'
              onClick={() => navigate('/login', { replace: true })}
            >
              로그인 화면으로 돌아가기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
