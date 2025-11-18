import axios from 'axios';

const BASE_URL = 'http://localhost:3001/users';

// 회원가입
export const signup = async ({ username, password, name }) => {
  const { data: existing } = await axios.get(`${BASE_URL}?username=${username}`);
  if (existing.length > 0) throw new Error('이미 존재하는 아이디입니다.');

  const { data: newUser } = await axios.post(BASE_URL, { username, password, name });
  return newUser;
};

// 로그인
export const login = async ({ username, password }) => {
  const { data } = await axios.get(`${BASE_URL}?username=${username}`);
  const user = data[0];

  if (!user) throw new Error('아이디가 존재하지 않습니다.');
  if (user.password !== password) throw new Error('비밀번호가 일치하지 않습니다.');

  localStorage.setItem('loginUser', JSON.stringify(user));
  return user;
};

// 로그인 상태 확인
export const getLoginUser = () => {
  const stored = localStorage.getItem('loginUser');
  return stored ? JSON.parse(stored) : null;
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem('loginUser');
};
