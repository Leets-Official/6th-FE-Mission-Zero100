import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Text from '../components/common/Text';

export default function Home() {
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
      </div>
    </div>
  );
}
