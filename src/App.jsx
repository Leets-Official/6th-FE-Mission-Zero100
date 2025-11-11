import {Routes, Route} from 'react-router-dom';

import Root from './pages/Root';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';

import './App.css';

function App(){
    return(
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/todo" element={<TodoPage />} />
        </Routes>
    );
}

export default App;