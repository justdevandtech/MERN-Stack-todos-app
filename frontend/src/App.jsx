
import './App.css';
import { Container } from 'react-bootstrap';
import { TodoList } from './components/TodoList';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Container fluid className='app'>
        <br />
        <Container>
          <h1 className='text-center'>Todo App</h1>
          <TodoList />
        </Container>
      </Container>
  );
}

export default App;
