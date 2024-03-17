import React from 'react';

import Footer from '../Footer/Footer';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
// import Task from '../Task/Task';
import './app.css';
import { Mapper } from '../../utils/types';

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
    description: 'Task 1',
  },
  {
    id: '2',
    isCompleted: true,
    isEditing: false,
    createdAt: new Date(),
    description: 'Task 2',
  },
  {
    id: '3',
    isCompleted: false,
    isEditing: false,
    createdAt: new Date(),
    description: 'Task 3',
  },
];

type AppProps = object;
type AppState = {
  tasks: TTask[]; // Array<TTask>
  filter: TTasksFilter;
  taskCount: number;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      tasks: initialTasks,
      filter: 'all',
      taskCount: initialTasks.reduce((sum, task) => {
        if (!task.isCompleted) {
          return sum + 1;
        }
        return sum;
      }, 0),
    };
  }

  setTasks = (valueOrMapper: TTask[] | Mapper<TTask[]>) => {
    this.setState((prevState) => ({
      ...prevState,
      tasks: valueOrMapper instanceof Function ? valueOrMapper(prevState.tasks) : valueOrMapper,
    }));
  };

  setFilter = (valueOrMapper: TTasksFilter | Mapper<TTasksFilter>) => {
    this.setState((prevState) => ({
      ...prevState,
      filter: valueOrMapper instanceof Function ? valueOrMapper(prevState.filter) : valueOrMapper,
    }));
  };

  override componentDidUpdate(prevProps, prevState: AppState) {
    if (this.state.tasks !== prevState.tasks) {
      this.setState((prevState) => ({
        ...prevState,
        taskCount: prevState.tasks.reduce((sum, task) => {
          if (!task.isCompleted) {
            return sum + 1;
          }
          return sum;
        }, 0),
      }));
    }
  }

  override render() {
    return (
      <section className="todoapp">
        <TaskForm setTasks={this.setTasks} />
        <section className="main">
          <ul className="todo-list">
            {/* <Task /> */}
            <TaskList filter={this.state.filter} tasks={this.state.tasks} setTasks={this.setTasks} />
          </ul>
        </section>
        <Footer
          filter={this.state.filter}
          setFilter={this.setFilter}
          setTasks={this.setTasks}
          taskCount={this.state.taskCount}
        />
      </section>
    );
  }
}

/*
function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all' as TTasksFilter);

  const taskCount = useMemo(
    () => {
      return tasks.reduce((sum, task) => {
        if (!task.isCompleted) {
          return sum+1;
        }
        return sum;
      }, 0);
    },
    [tasks]
  );

  return (
    <section className="todoapp">
      <TaskForm setTasks={setTasks} />
      <section className="main">
        <ul className="todo-list">
          {/!* <Task /> *!/}
          <TaskList filter={filter} tasks={tasks} setTasks={setTasks} />
        </ul>
      </section>
      <Footer filter={filter} setFilter={setFilter} setTasks={setTasks} taskCount={taskCount} />
    </section>
  );
}
*/

export default App;
