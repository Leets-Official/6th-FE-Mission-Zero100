import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Text from '../components/common/Text';
import { getKakaoRedirectUrl } from '../lib/auth';
import KakaoIcon from '../assets/kakao-login.svg?react';

export default function Home() {
  const handleKakaoLogin = () => {
    const redirectUrl = getKakaoRedirectUrl();
    window.location.href = redirectUrl;
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white'>
      <Text as='h1' className='text-3xl font-extrabold mb-10 tracking-tight'>
        예빈&apos;s TODO
      </Text>

      <div className='flex flex-col gap-4 w-[250px]'>
        <Link to='/login'>
          <Button className='w-full py-3 !rounded-full !bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-colors duration-200 border-none'>
            로그인
          </Button>
        </Link>

        <Link to='/signup'>
          <Button className='w-full py-3 !rounded-full !bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-colors duration-200 border-none'>
            회원가입
          </Button>
        </Link>

        <Button
          onClick={handleKakaoLogin}
          variant='kakao'
          className='!border-0 !rounded-2xl flex items-center justify-center gap-4'
        >
          <KakaoIcon width={26} height={26} aria-hidden='true' />
          <span>카카오로 로그인</span>
        </Button>
      </div>
    </div>
  );
}
