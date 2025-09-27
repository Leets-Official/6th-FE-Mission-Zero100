/*import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});

export default MyInput;*/

// Button.jsx

function Button({ disabled, children }) { 
  return <button disabled={disabled}>{children}</button>;
} /* function Button({속성, props}){ ... }
    -> disabled : 버튼의 활성화 여부를 true, false로 나타냄
    children : Button태그 안에 들어갈 내용 ex) Add, Show all tasks 등
    <button disabled={disabled}> : 위에서 받은 disabled라는 정보(true, false)를 
     이 HTML 버튼 태그의 disabled라는 속성에 연결함 */ 

export default Button; //Button모듈을 내보냄 -> 다른 파일에서 쓸 수 있게 됨


