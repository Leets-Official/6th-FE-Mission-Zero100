import axios from "axios";

// 백엔드 서버 요청용 axios 인스턴스
export const api = axios.create({
  baseURL: "https://blog.leets.land",
  withCredentials: true,
  timeout: 5000,
});

// 로컬 json-server 주소
const LOCAL_USER_URL = "http://localhost:3000/users";

// 로컬 json-server: 이메일로 사용자 조회
export const fetchUserByEmail = async (email) => {
  const res = await axios.get(LOCAL_USER_URL, {
    params: { email },
  });
  return res.data;
};

// 로컬 json-server: 일반 회원가입
export const signupUser = async (userData) => {
  const res = await axios.post(LOCAL_USER_URL, userData);
  return res.data;
};

// 로컬 json-server: 일반 로그인
export const loginUser = async ({ email, password }) => {
  const res = await fetchUserByEmail(email);
  if (res.length === 0) throw new Error("존재하지 않는 아이디입니다.");

  const user = res[0];
  if (user.password !== password) throw new Error("비밀번호가 일치하지 않습니다.");

  return user;
};

// OAuth 회원가입 (swagger 스펙에 맞게 요청)
export const registerOauth = async ({
                                      email,
                                      nickname,
                                      profilePicture,
                                      name,
                                      kakaoId,
                                      birthDate,
                                    }) => {
  const body = {
    email,
    nickname,
    profilePicture,
    name,
    kakaoId,
    birthDate,
  };

  console.log("[OAuth 회원가입 body]:", body);

  const { data } = await api.post("/auth/register-oauth", body);
  return data;
};

// 카카오 로그인 redirect 처리
export const kakaoLogin = async (code) => {
  const { data } = await api.get("/auth/kakao/redirect", {
    params: { code },
  });
  return data;
};
