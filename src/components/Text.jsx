function Text({tag = "p", children}) {
  const Tag = tag;
  return <Tag>{children}</Tag>
}

export default Text;

/*
<Text tag="h1">TodoMatic</Text>
        │
        ▼
props = { tag: "h1", children: "TodoMatic" }
        │
        ▼
function Text({ tag, children }) { ... }
        │
        ▼
<h1>TodoMatic</h1>
*/

/*
왜 children을 써야 하는지?
<Text>안녕하세요</Text>
태그 사이에 들어간 값은 React가 자동으로 props.children이라는 이름으로만 전달한다.
= React 내부 규칙이라서 다른 이름으로 직접 받을 수는 없다.
*태그 안쪽 내용을 받고 싶으면 children,
속성으로 전달하는 값을 쓰고 싶으면 text 같은 prop를 받는다.
*/
