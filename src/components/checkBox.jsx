import React from 'react'

const Checkbox = ({ label, name }) => {
  return (
    <label>
      {'•'} {/* css파일에 disc를 설정했는데 작동이 안 돼서 그냥 여기 작성함 ㅠ */}
      <input type='checkbox' name={name} />
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
