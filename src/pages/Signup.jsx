import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // UI-only: pretend signup succeeded and navigate to login
    navigate('/login')
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',minHeight:'100vh',background:'#f5f5f5',padding:'40px 20px'}}>
      <div style={{width:'100%',maxWidth:420}}>
        <h1 style={{fontSize:28,fontWeight:700,textAlign:'center',marginBottom:28}}>회원가입</h1>

        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <label style={{width:72,fontSize:16}}>이름</label>
            <input value={name} onChange={e=>setName(e.target.value)} style={{flex:1,padding:'10px 12px',borderRadius:6,border:'1px solid #ccc'}} />
          </div>

          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <label style={{width:72,fontSize:16}}>아이디</label>
            <input value={id} onChange={e=>setId(e.target.value)} style={{flex:1,padding:'10px 12px',borderRadius:6,border:'1px solid #ccc'}} />
          </div>

          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <label style={{width:72,fontSize:16}}>비밀번호</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{flex:1,padding:'10px 12px',borderRadius:6,border:'1px solid #ccc'}} />
          </div>

          <div style={{display:'flex',justifyContent:'center',marginTop:6}}>
            <button type="submit" style={{padding:'12px 20px',background:'#4B5563',color:'#fff',border:'none',borderRadius:8,boxShadow:'0 2px 0 rgba(0,0,0,0.3)',fontSize:16}}>회원가입</button>
          </div>
        </form>
      </div>
    </div>
  )
}