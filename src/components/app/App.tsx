import Footer from '../footer/Footer';
import TaskForm from '../taskForm/TaskForm';
import TaskList from '../taskList/taskList';
// import Task from '../task/Task';
import './app.css';
import { useState } from 'react';

export type TTask = {
  id: string;
  isCompleted: boolean;
  isEditing: boolean;
  createdAt: Date;
  description: string;
};

export type TTasksFilter = 'all' | 'active' | 'completed';

const initialTasks: TTask[] = [
  {
    id: '1',
    isCompleted: false,
    isEditing: true,
    createdAt: new Date(),
    description: 'Task 1'
  },
  {
    id: '2',
    isCompleted: true,
    isEditing: false,
    createdAt: new Date(),
    description: 'Task 2'
  },
  {
    id: '3',
    isCompleted: false,
    isEditing: false,
    createdAt: new Date(),
    description: 'Task 3'
  }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all' as TTasksFilter);

  return (
    <section className="todoapp">
      <TaskForm setTasks={setTasks} />
      <section className="main">
        <ul className="todo-list">
          {/*<Task />*/}
          <TaskList filter={filter} tasks={tasks} setTasks={setTasks} />
        </ul>
      </section>
      <Footer filter={filter} setFilter={setFilter} />
    </section>
  );
}

export default App;
