import { api } from './api';
import axios from 'axios';

const ACCESS_TOKEN_KEY = 'accessToken';
const LOGIN_USER_KEY = 'loginUser';
const LOCAL_USER_URL = import.meta.env.VITE_LOCAL_USER_URL;

const saveAccessToken = (token) => {
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

const saveLoginUser = (user) => {
  if (user) localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
};

const extractAccessToken = (data) => data?.accessToken || data?.access_token || data?.token;
const extractUser = (data, fallback) => data?.user || data?.data || fallback;

// 회원가입: 성공 시 토큰이 오면 저장 후 사용자 정보 반환
export const signup = async ({ username, password, name }) => {
  // 로컬 json-server (/server/db.json) 사용
  const { data: existing } = await axios.get(`${LOCAL_USER_URL}?username=${username}`);
  if (existing.length > 0) throw new Error('이미 존재하는 아이디입니다.');

  const { data: newUser } = await axios.post(LOCAL_USER_URL, { username, password, name });
  saveLoginUser(newUser);
  return newUser;
};

// 로그인: 성공 시 토큰 저장 후 사용자 정보 반환
export const login = async ({ username, password }) => {
  // 로컬 json-server (/server/db.json) 사용
  const { data } = await axios.get(`${LOCAL_USER_URL}?username=${username}`);
  const user = data[0];

  if (!user) throw new Error('아이디가 존재하지 않습니다.');
  if (user.password !== password) throw new Error('비밀번호가 일치하지 않습니다.');

  saveLoginUser(user);
  return user;
};

// 카카오 로그인 redirect URL 받기
export const getKakaoRedirectUrl = () => `${api.defaults.baseURL}/auth/kakao`;

// 카카오 콜백 처리 후 로그인
export const kakaoLogin = async (code) => {
  const { data } = await api.get('/auth/kakao/redirect', { params: { code } });

  const accessToken = extractAccessToken(data);
  saveAccessToken(accessToken);

  const user = extractUser(data);
  saveLoginUser(user);
  return user;
};

// 카카오 로그인 후 회원가입 (401 받은 경우)
export const registerOauth = async ({ code, username, password, name }) => {
  const email = `${username}@temp.local`;
  const { data } = await api.post('/auth/register-oauth', {
    code,
    username,
    password,
    name,
    nickname: name, // 닉네임 필수 조건 대응
    email,
  });

  const accessToken = extractAccessToken(data);
  saveAccessToken(accessToken);

  const user = extractUser(data, { username, name });
  saveLoginUser(user);
  return user;
};

// 로그인 상태 확인
export const getLoginUser = () => {
  const stored = localStorage.getItem(LOGIN_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOGIN_USER_KEY);
};
