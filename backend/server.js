import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 4000
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:5173'
const USER_DB_URL = process.env.USER_DB_URL || 'http://localhost:3001'
// If MOCK_KAKAO=true the server will simulate Kakao login for local development
const MOCK_KAKAO = process.env.MOCK_KAKAO === 'true'
const MOCK_PROVIDER_ID = process.env.MOCK_PROVIDER_ID || '12345'

// 1) Redirect user to Kakao authorization page
app.get('/auth/kakao', (req, res) => {
  if (!KAKAO_CLIENT_ID) {
    return res.status(500).send('KAKAO_CLIENT_ID not configured on server')
  }

  // If mock mode enabled, shortcut the flow and redirect back to frontend with a mock `code`
  if (MOCK_KAKAO) {
    const mockUrl = `${FRONTEND_BASE_URL}/auth/kakao/callback?code=mock`
    const accept = req.get('accept') || ''
    if (accept.includes('application/json')) {
      return res.json({ code: 200, message: 'OK', data: { redirectUrl: mockUrl } })
    }
    return res.redirect(mockUrl)
  }

  const redirectUri = `${FRONTEND_BASE_URL}/auth/kakao/callback`
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${encodeURIComponent(
    KAKAO_CLIENT_ID
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`

  // If the client expects JSON (e.g., an XHR request), return the URL in a response body
  const accept = req.get('accept') || ''
  if (accept.includes('application/json')) {
    return res.json({ code: 200, message: 'OK', data: { redirectUrl: kakaoAuthUrl } })
  }

  // otherwise redirect the browser to Kakao login (normal OAuth flow)
  res.redirect(kakaoAuthUrl)
})

// 2) Exchange code for token and fetch user profile
// Frontend will call this endpoint with ?code=... after being redirected back to frontend
app.get('/auth/kakao/redirect', async (req, res) => {
  const code = req.query.code
  if (!code) return res.status(400).json({ message: 'code is required' })

  // Mock shortcut: if code === 'mock' and MOCK_KAKAO enabled, return or create a test user
  if (MOCK_KAKAO && code === 'mock') {
    try {
      const usersRes = await axios.get(`${USER_DB_URL}/users`, {
        params: { provider: 'kakao', providerId: MOCK_PROVIDER_ID },
      })
      const users = usersRes.data
      if (users && users.length) {
        return res.status(200).json({ code: 200, message: 'OK', data: users[0] })
      }

      // create a new user if not exists
      const createRes = await axios.post(`${USER_DB_URL}/users`, {
        name: 'Mock Kakao User',
        username: `kakao_${MOCK_PROVIDER_ID}`,
        provider: 'kakao',
        providerId: MOCK_PROVIDER_ID,
      })
      return res.status(200).json({ code: 200, message: 'OK', data: createRes.data })
    } catch (e) {
      console.warn('Mock user lookup/create failed', e.message)
      return res.status(500).json({ code: 500, message: 'mock user lookup failed' })
    }
  }

  try {
    // exchange code for token
    const tokenUrl = 'https://kauth.kakao.com/oauth/token'
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('client_id', KAKAO_CLIENT_ID)
    if (KAKAO_CLIENT_SECRET) params.append('client_secret', KAKAO_CLIENT_SECRET)
    params.append('redirect_uri', `${FRONTEND_BASE_URL}/auth/kakao/callback`)
    params.append('code', code)

    const tokenRes = await axios.post(tokenUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    const accessToken = tokenRes.data.access_token
    if (!accessToken) return res.status(500).json({ message: 'no access token from kakao' })

    // fetch profile
    const profileRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const kakaoProfile = profileRes.data

    // simple mapping: use kakao id as providerId
    const providerId = kakaoProfile.id

    // Check existing users in json-server (USER_DB_URL/users?provider=kakao&providerId=...)
    try {
      const usersRes = await axios.get(`${USER_DB_URL}/users`, {
        params: { provider: 'kakao', providerId },
      })

      const users = usersRes.data
      if (users && users.length) {
        // return the existing user wrapped in the API response envelope per spec
        return res.status(200).json({ code: 200, message: 'OK', data: users[0] })
      }
    } catch (e) {
      // If json-server not available, we'll still continue to respond 401 so frontend can signup flow
      console.warn('User DB lookup failed', e.message)
    }

    // user not found -> signal frontend to show signup (401) using response envelope
    return res.status(401).json({ code: 401, message: 'user not found' })
  } catch (err) {
    console.error(err?.response?.data || err.message)
    const status = err?.response?.status || 500
    const data = err?.response?.data || { message: err.message }
    return res.status(status).json(data)
  }
})

app.listen(PORT, () => {
  console.log(`Kakao helper server running on http://localhost:${PORT}`)
})
