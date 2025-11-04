import React from 'react'
import { Link } from 'react-router-dom'

export default function TodoPage() {
  return (
    <div style={{display:'flex',justifyContent:'center',paddingTop:40}}>
      <div style={{width:720,background:'#fff',padding:20,borderRadius:6,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h2 style={{margin:0}}>TODO 페이지</h2>
          <Link to="/" style={{fontSize:14,color:'#374151',textDecoration:'none'}}>루트로</Link>
        </div>

        <div style={{padding:12,background:'#f3f4f6',borderRadius:6}}>
          {/* UI-only placeholder: real todo list already exists in app; this is a page placeholder */}
          <p style={{margin:0,color:'#374151'}}>여기는 Todo 페이지(UI 전용)입니다. 실제 기능은 기존 Todo 컴포넌트에서 동작합니다.</p>
        </div>
      </div>
    </div>
  )
}
