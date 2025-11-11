import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Text from '../components/common/Text';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    if (!id || !pw) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }
    navigate('/todo');
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='bg-white p-10 rounded-lg shadow-md w-[400px]'>
        <Text as='h2' className='text-2xl font-bold mb-8 text-center'>
          로그인
        </Text>

        <div className='flex flex-col gap-4 mb-6'>
          <div className='flex items-center justify-between gap-3'>
            <label htmlFor='id' className='w-20 text-right font-medium text-gray-700'>
              아이디
            </label>
            <Input
              id='id'
              placeholder='아이디를 입력하세요'
              value={id}
              onChange={(e) => setId(e.target.value)}
              className='flex-1 border-gray-400'
            />
          </div>

          <div className='flex items-center justify-between gap-3'>
            <label htmlFor='pw' className='w-20 text-right font-medium text-gray-700'>
              비밀번호
            </label>
            <Input
              id='pw'
              type='password'
              placeholder='비밀번호를 입력하세요'
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className='flex-1 border-gray-400'
            />
          </div>
        </div>

        <div className='flex justify-end mb-6'>
          <Button
            variant='primary'
            className='w-full flex item-center justify-center leading-none bg-gray-700 text-white border-none hover:bg-gray-800 transition'
            onClick={handleLogin}
          >
            로그인
          </Button>
        </div>

        <p className='text-center text-gray-600 text-sm'>
          아직 회원이 아니신가요?{' '}
          <Link to='/signup' className='text-blue-600 underline'>
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
