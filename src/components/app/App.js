import Footer from '../footer/footer';
import TaskForm from '../taskForm/taskForm';
import TaskList from '../taskList/taskList';
import Task from '../task/Task';
import './app.css';

function App() {
  return (
    <section className="todoapp">
      <TaskForm />
      <section className="main">
        <ul className="todo-list">
          <Task />
          <TaskList />
        </ul>
      </section>
      <Footer />
    </section>
  );
}

export default App;
