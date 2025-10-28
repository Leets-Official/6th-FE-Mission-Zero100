import Header from "./components/Header";
import TodoContainer from "./containers/TodoContainer";

export default function App() {
    return (
        <div className="max-w-xl mx-auto p-6">
            <Header />
            <TodoContainer />
        </div>
    );
}
