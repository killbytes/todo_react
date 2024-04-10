import './taskForm.css';
import React from 'react';
import * as uuid from 'uuid';

import { TTask } from '../App/App';
import { SetterOrUpdater } from '../../utils/types';

type TaskFormProps = {
  setTasks: SetterOrUpdater<TTask[]>;
};
type TaskFormState = {
  newTask: string;
};

/*
React.PureComponent - чистая классовая компонента, будет перерендерится только если изменились стэйт или пропсы.
Обычная компонента ещё перерендерится если просто перерендерится её родитель.
*/
class TaskForm extends React.PureComponent<TaskFormProps, TaskFormState> {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
    };
  }

  setDescription = (newTask: string) => {
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
          className="new-todo-form"
          style={{ display: 'contents' }}
          onSubmit={(ev) => {
            ev.preventDefault();
            if (this.state.newTask) {
              this.addTask();
              this.setDescription('');
            }
            // const currenTarget = ev.currentTarget as HTMLFormElement;
            // currenTarget.reset();
          }}
        >
          <h1>Todos</h1>
          <input
            className="new-todo"
            placeholder="Task"
            value={this.state.newTask}
            // onKeyUp={(ev: React.KeyboardEvent) => {
            //     if (ev.key === 'Enter') addTask()
            // }}
            onChange={(ev) => this.setDescription(ev.currentTarget.value)}
          />
          <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" />
        </form>
      </header>
    );
  }
}

/*
const TaskFormFun = React.memo(
(props: TaskFormProps) => {
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
});
*/

export default TaskForm;
