const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; 

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use(express.json());


app.get('/auth/kakao', (req, res) => {
    console.log('📩 [서버] 로그인 URL 요청 받음');
    const fakeKakaoUrl = 'http://localhost:3000/auth/kakao/callback?code=FAKE_AUTH_CODE_12345';
    res.send(fakeKakaoUrl); 
});

app.get('/auth/kakao/redirect', (req, res) => {
    const { code } = req.query;
    console.log(`📩 [서버] 인가 코드 받음: ${code}`);

    if (code === 'FAKE_AUTH_CODE_12345') {
        res.json({
            code: 0,
            message: "성공",
            data: {
                accessToken: "fake_access_token_example",
                refreshToken: "fake_refresh_token_example",
                nickname: "김주영(가짜)",
                email: "user@example.com"
            }
        });
    } else {
        res.status(400).json({ message: "유효하지 않은 코드입니다." });
    }
});

app.post('/auth/reissue', (req, res) => {
    console.log('📩 [서버] 토큰 재발급 요청 받음');
    res.json({
        code: 0,
        message: "재발급 성공",
        data: {
            accessToken: "new_fake_access_token_" + Date.now(), 
            refreshToken: "new_fake_refresh_token"
        }
    });
});


app.listen(PORT, () => {
    console.log(`백엔드 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
