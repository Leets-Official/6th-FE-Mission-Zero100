import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // UI-only: just navigate to /todo on "login"
    navigate('/todo')
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',minHeight:'100vh',background:'#f5f5f5',padding:'40px 20px'}}>
      <div style={{width:'100%',maxWidth:400}}>
  {/* Title */}
  <h1 style={{fontSize:24,fontWeight:500,marginBottom:32,color:'#111',textAlign:'center'}}>로그인</h1>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:8}}>
            <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginRight: 10 }}>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <div style={{flex:1, display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <p style={{ width: "100px", textAlign: "end" }}>아이디</p>
                            <input 
                                placeholder="아이디"
                                value={id} 
                                onChange={e=>setId(e.target.value)} 
                                style={{
                                width:'100%',
                                padding:'12px 16px',
                                fontSize:14,
                                border:'1px solid #ddd',
                                borderRadius:4,
                                outline:'none'
                                }} 
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: 10, display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <p style={{ width: "100px", textAlign: "end" }}>비밀번호</p>
                        <input 
                        type="password"
                        placeholder="비밀번호" 
                        value={password} 
                        onChange={e=>setPassword(e.target.value)} 
                        style={{
                            width:'100%',
                            padding:'12px 16px',
                            fontSize:14,
                            border:'1px solid #ddd',
                            borderRadius:4,
                            outline:'none'
                        }} 
                        />
                    </div>
                </div>
        <button
          type="submit"
          style={{
            width: '120px',
            alignSelf: 'stretch',
            background: '#4B5563',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 20,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            padding: 0
          }}
        >
          로그인
        </button>
            </div>
          
        </form>
      </div>
    </div>
  )
}
