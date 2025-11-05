import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700'>
      <h1 className='text-3xl font-bold mb-4'>404 Not Found</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to='/' className='mt-6 underline'>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
