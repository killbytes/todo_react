import './taskForm.css';
import React from 'react';
import * as uuid from 'uuid';
import { TTask } from '../app/App';
import { SetterOrUpdater } from '../../utils/types';

type TaskFormProps = {
  setTasks: SetterOrUpdater<TTask[]>;
};
type TaskFormState = {
  newTask: string;
};

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
    };
  }

  setDescription = (newTask) => {
    this.setState((prevState) => ({
      ...prevState,
      newTask,
    }));
  };

  addTask = () =>
    this.props.setTasks((tasks) => [
      {
        id: uuid.v4(),
        isCompleted: false,
        isEditing: false,
        createdAt: new Date(),
        description: this.state.newTask,
      },
      ...tasks,
    ]);

  override render() {
    return (
      <header className="header">
        <form
          style={{ display: 'contents' }}
          onSubmit={(ev) => {
            ev.preventDefault();
            this.addTask();
            const currenTarget = ev.target as HTMLFormElement;
            currenTarget.reset();
          }}
        >
          <h1>Todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            // value={description}
            // onKeyUp={(ev: React.KeyboardEvent) => {
            //     if (ev.key === 'Enter') addTask()
            // }}
            onChange={(ev) => this.setDescription(ev.currentTarget.value)}
          />
        </form>
      </header>
    );
  }
}
/*

function TaskForm(props: TaskFormProps) {
  const [description, setDescription] = useState('');

  const addTask = () =>
    props.setTasks((tasks) => [
      {
        id: uuid.v4(),
        isCompleted: false,
        isEditing: false,
        createdAt: new Date(),
        description,
      },
      ...tasks,
    ]);

  return (
    <header className="header">
      <form
        style={{display: 'contents'}}
        onSubmit={(ev) => {
          ev.preventDefault();
          addTask();
          const currenTarget = ev.target as HTMLFormElement;
          currenTarget.reset();
        }}
      >
        <h1>Todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          // value={description}
          // onKeyUp={(ev: React.KeyboardEvent) => {
          //     if (ev.key === 'Enter') addTask()
          // }}
          onChange={(ev) => setDescription(ev.currentTarget.value)}
        />
      </form>
    </header>
  );
}
*/

export default TaskForm;
