import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Text from '../components/common/Text';
import { signup } from '../lib/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSignup = async () => {
    if (!name || !id || !pw) {
      alert('모든 항목을 입력하세요.');
      return;
    }

    try {
      await signup({ username: id, password: pw, name });
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='bg-white p-10 rounded-lg shadow-md w-[420px]'>
        <Text as='h2' className='text-2xl font-bold mb-8 text-center'>
          회원가입
        </Text>

        <div className='flex flex-col gap-4 mb-6'>
          <div className='flex items-center justify-between gap-3'>
            <label htmlFor='name' className='w-20 text-right font-medium text-gray-700'>
              이름
            </label>
            <Input
              id='name'
              placeholder='이름을 입력하세요'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='flex-1 border-gray-400'
            />
          </div>

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
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </div>

        <p className='text-center text-gray-600 text-sm'>
          이미 계정이 있으신가요?{' '}
          <Link to='/login' className='text-blue-600 underline'>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
