import { useNavigate } from "react-router-dom";

function Root(){
    const navigate = useNavigate();

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
            <h1 className="text-5xl font-bold mb-16">
                00's TODO
            </h1>
            <div className="flex flex-col space-y-6 w-64">
                <button 
                    onClick={()=>navigate('/login')}
                    className="w-full bg-gray-200 text-gray-800 font-semibold py-3 py-6 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 text-lg">
                        로그인
                    </button>
                    <button 
                    onClick={()=>navigate('/signup')}
                    className="w-full bg-gray-200 text-gray-800 font-semibold py-3 py-6 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 text-lg">
                        회원가입
                    </button>
            </div>
        </div>
    );
}

export default Root;