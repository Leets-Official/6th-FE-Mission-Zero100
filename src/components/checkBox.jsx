import React from 'react'

const Checkbox = ({ label, name, checked, onChange }) => {
  return (
    <label>
      <input 
      type='checkbox' 
      name={name}
      checked = {checked}
      onChange={onChange} 
      className="h-5 w-5 rounded-none border-gray-400 text-slate-800 focus:ring-slate-700"/>
      {label}
    </label>
  )
}

export default Checkbox

/*
name : 문자열 타입. 폼과 제출 되는 입력의 이름을 지정
label : 체크박스 옆에 나타날 글자, 얘만 눌러도 체크박스 표시가 되도록 함
input type="checkbox": HTML에서 체크박스를 만드는 기본 코드임 
*/
