import api from "../api/axios";

// 간단 토큰 생성기(학습용)
function makeToken(username) {
  return btoa(`${username}-${Date.now()}`);
}

// 회원가입
export async function register({ username, password, name }) {
  // 1) 아이디 중복 체크
  const { data: exists } = await api.get("/users", { params: { username } });
  if (exists.length > 0) {
    // 기존에 존재하는 아이디
    return { ok: false, code: "USERNAME_TAKEN", message: "이미 존재하는 아이디예요." };
  }

  // 2) 신규 생성
  const { data: newUser } = await api.post("/users", { username, password, name });
  return { ok: true, user: newUser };
}

// 로그인
export async function login({ username, password }) {
  // 1) 아이디 존재 확인
  const { data: users } = await api.get("/users", { params: { username } });

  if (!users || users.length === 0) {
    // 아이디가 존재하지 않음
    return { ok: false, code: "USER_NOT_FOUND", message: "가입되지 않은 아이디입니다." };
  }

  const user = users[0];

  // 2) 비밀번호 검증
  if (user.password !== password) {
    return { ok: false, code: "INVALID_PASSWORD", message: "비밀번호가 올바르지 않습니다." };
  }

  // 3) 성공 → 토큰 부여(임시)
  const token = makeToken(user.username);
  return { ok: true, user, token };
}