## 1. 무엇을?

ToDoMatic의 주요기능을 추가했습니다

<br>

## 2. 상세 설명

1. 작업추가하기 : useState를 이용해 사용자로부터 값을 입력받고 todoList에 추가함
2. 작업완료하기 : Todo.jsx 파일에서 Checkbox 컴포넌트의 onChange 이벤트가 발생했을 때, 어떤 할 일(task)이 변경되어야 하는지 알려주기 위해 onToggle 함수에 해당 task.id를 인자로 전달함
3. 작업 필터별로 보기 : TodoList에 원본 tasks 대신 필터링된 filteredTasks를 전달하도록 코드를 수정하고 선택된 카테고리에 따라 할 일 목록을 필터링하는 로직 추가함

<br>

## 3. 추가 사항
작업을 삭제하는 로직은 2주차에 미리 완성을 해두었었음 
`  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };`
