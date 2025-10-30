import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Button from "../components/button";
import Input from "../components/Input";

function LoginPage(){
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => { //인풋이벤트 발생 시 페이지가 reload되는 걸 막기 위해 사용
        e.preventDefault();
        console.log('로그인시도');
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
                            onChange={(e)=>setId(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="pwd" className="block mb-1 text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <Input
                            id="pwd"
                            name="pwd"
                            type="password" //비밀번호가림
                            placeholder="비밀번호를 입력하세요"
                            value={pwd}
                            onChange={(e)=>setPwd(e.target.value)}/>
                    </div>
                    <div>
                        <Button type="submit">
                            로그인
                        </Button>
                    </div>
                </form>
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