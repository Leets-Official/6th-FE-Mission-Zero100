import Text from "./components/Text";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";

function App() {
  return (
    <main>
      <h1>Todo (UI only)</h1>

      {/* 인풋 + 버튼 */}
      <Input placeholder="할 일을 입력하세요" />
      <Button>추가</Button>

      {/* 체크박스 + 텍스트 */}
      <div>
        <Checkbox />
        <Text>예시 할 일</Text>
      </div>
    </main>
  );
}

export default App;
