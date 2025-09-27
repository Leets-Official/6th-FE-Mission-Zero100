import React from 'react'; //'리액트를 불러와서 사용하겠다.'라는 의미 꼭 써야 됨

const Text = ({ children }) => { //Text라는 컴포넌트를 만들기 위해 화살표 함수 사용, 입력받은 값은 children으로 들어감
  return <p>{children}</p>; //입력받은 값을  <p>{children}</p>의 형태로 반환
};

export default Text; //하나의 모듈에서 가장 중요한 기능 하나만 내보낼 때 사용하는 JavaScript 문법