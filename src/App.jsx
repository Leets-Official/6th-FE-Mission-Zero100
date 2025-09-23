import Text from './components/Text';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Input from './components/Input';

export default function App() {
    // UI만: 더미 데이터
    const tasks = ['Eat', 'Sleep', 'Repeat'];

    return (
        <div style={{ maxWidth: 720, margin: '2rem auto' }}>
            {/* 제목 */}
            <Text as="h1">TodoMatic</Text>

            {/* 서브 타이틀 */}
            <Text as="h2">What needs to be done?</Text>

            {/* 입력 + 추가 버튼 */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Input aria-label="New task" placeholder="Add a task" />
                <Button>Add</Button>
            </div>

            {/* 필터 버튼 3개 */}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Button>Show all tasks</Button>
                <Button>Show active tasks</Button>
                <Button>Show completed tasks</Button>
            </div>

            {/* 남은 개수 */}
            <Text as="h3" style={{ marginTop: 24 }}>
                {tasks.length} tasks remaining
            </Text>

            {/* 리스트 (기능 없이 정적 UI) */}
            <ul style={{ marginTop: 16, display: 'grid', gap: 16 }}>
                {tasks.map((label, idx) => {
                    const id = `task-${idx}`;
                    return (
                        <li key={id} style={{ display: 'grid', gap: 8 }}>
                            {/* 체크박스 + 라벨 */}
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <Checkbox id={id} defaultChecked={label === 'Eat'} />
                                <label htmlFor={id}>{label}</label>
                            </div>

                            {/* 편집/삭제 버튼 (모양만) */}
                            <div style={{ display: 'flex', gap: 8, paddingLeft: 24 }}>
                                <Button>{`Edit ${label}`}</Button>
                                <Button>{`Delete ${label}`}</Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
