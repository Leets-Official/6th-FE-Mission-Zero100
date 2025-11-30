import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import Input from "../components/Input";
import KakaoIcon from '../assets/kakao.svg?react';

const BASE_URL = import.meta.env.VITE_API_URL;

function LoginPage(){
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

const handleKakaoLogin = () => {
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    console.log("Redirect URI:", redirectUri);

    if (!redirectUri) {
        alert("리다이렉트 URI 설정이 되어있지 않습니다.");
        return;
    }
    window.location.href = `https://blog.leets.land/auth/kakao?redirect_uri=${redirectUri}`;
};

    const handleLogin = (e) => { 
        e.preventDefault();
        setError('');
        console.log('로그인 시도');

        if (!id || !pwd) {
            setError('아이디와 비밀번호를 입력해주세요');
            return;
        }

        try {
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            console.log('저장된 유저 목록:', storedUsers);

            const targetUser = storedUsers.find(
                user => user.username === id && user.password === pwd
            );

            if (targetUser) {
                console.log('로그인 성공! 유저 정보:', targetUser);
                
                localStorage.setItem('loggedInUser', JSON.stringify(targetUser));
                localStorage.setItem('userId', String(targetUser.id));
                
                console.log('LocalStorage 저장 완료:', {
                    loggedInUser: localStorage.getItem('loggedInUser'),
                    userId: localStorage.getItem('userId')
                });
                
                alert(`${targetUser.name}님, 환영합니다!`);
                
                console.log('Todo 페이지로 이동 중...');
                navigate('/todo', { replace: true });
            } else {
                console.log('로그인 실패: 일치하는 유저 없음');
                setError('아이디 또는 비밀번호가 일치하지 않습니다');
            }
        } catch(error){
            console.error("로그인 중 오류 발생:", error);
            setError('로그인 중 오류가 발생했습니다');
        }
    };

    const navToSignUp = ()=>{
        navigate('/signup');
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">
                    로그인
                </h2>
                
                {/* 에러 메시지 표시 */}
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="id" className="block mb-1 text-sm font-medium text-gray-700">
                            아이디
                        </label>
                        <Input
                            id="id"
                            name="id"
                            placeholder="아이디를 입력하세요"
                            value={id}
                            onChange={(e)=>setId(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <label htmlFor="pwd" className="block mb-1 text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <Input
                            id="pwd"
                            name="pwd"
                            type="password" 
                            placeholder="비밀번호를 입력하세요"
                            value={pwd}
                            onChange={(e)=>setPwd(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <Button type="submit">
                            로그인
                        </Button>
                    </div>
                </form>
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">또는</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleKakaoLogin}
                        className="w-full py-2 px-4 bg-[#FEE500] text-black font-bold rounded-md hover:bg-[#FDD835] transition duration-200 flex justify-center items-center"
                    >
                        <KakaoIcon className="w-5 h-5 mr-2" />
                        Login with Kakao 
                    </button>
                </div>
                <div className="text-center">
                    <button
                        onClick={navToSignUp}
                        className="text-sm text-gray-600 hover:underline">
                            회원가입
                        </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;