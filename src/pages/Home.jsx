import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Text from '../components/common/Text';
import { getKakaoRedirectUrl } from '../lib/auth';
import kakaoBtn from '../assets/kakao-login.png';

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

      <div className='flex flex-col gap-4 w-[200px]'>
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

        <div className='flex justify-center'>
          <Button
            onClick={handleKakaoLogin}
            className='!w-[220px] !h-[55px] !p-0 !border-none !bg-transparent shadow-none flex justify-center items-center'
          >
            <img src={kakaoBtn} alt='카카오 로그인' className='w-full h-full object-contain' />
          </Button>
        </div>
      </div>
    </div>
  );
}
