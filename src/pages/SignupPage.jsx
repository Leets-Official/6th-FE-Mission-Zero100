import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/Input";

function SignupPage(){
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    
    const navigate = useNavigate();

    const handleSignupPage = (e) =>{
        e.preventDefault();
        console.log('회원가입시도');
    };

    const navToLogin = ()=>{
        navigate('/Login');
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">
                    회원가입
                </h2>
                <form className="space-y-4" onSubmit={handleSignupPage}>
                    <div>
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                            이름
                        </label>
                        <Input
                            id="name"
                            name="named"
                            placeholder="이름을 입력하세요"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}/>
                    </div>
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
                        <label htmlFor="pwd" className="block mb-1text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <Input 
                            id="pwd"
                            name="pwd"
                            type="password"
                            placeholder="비밀번호 입력하세요"
                            value={pwd}
                            onChange={(e)=>setPwd(e.target.value)}/>
                    </div>
                    <div>
                        <Button type="submit">
                            회원가입
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;