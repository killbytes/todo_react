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
  mins: string;
  secs: string;
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
      mins: '',
      secs: '',
    };
  }

  addTask = () => {
    const newTask: TTask = {
      id: uuid.v4(),
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
      description: this.state.newTask,
      timer: undefined,
    };
    const timer: TTask['timer'] = {
      createdTime: new Date(),
      pauseTime: undefined,
      pauseSum: 0,
      duration: 0,
    };
    let hasTimer = false;
    const mins = +this.state.mins;
    if (this.state.mins && Number.isFinite(mins) && mins >= 0) {
      timer.duration += mins * 60 * 1000;
      hasTimer = true;
    }
    const secs = +this.state.secs;
    if (this.state.secs && Number.isFinite(secs) && secs >= 0) {
      timer.duration += secs * 1000;
      hasTimer = true;
    }
    if (hasTimer) {
      newTask.timer = timer;
    }
    this.props.setTasks((tasks) => [newTask, ...tasks]);
  };

  override render() {
    const { mins, secs } = this.state;
    return (
      <header className="header">
        <form
          className="new-todo-form"
          style={{ display: 'contents' }}
          onSubmit={(ev) => {
            ev.preventDefault();
            if (this.state.newTask) {
              this.addTask();
              this.setState({ newTask: '' });
            }
            // const currenTarget = ev.currentTarget as HTMLFormElement;
            // currenTarget.reset();
          }}
        >
          <h1>Todos</h1>
          <button type="submit" style={{ display: 'none' }}>
            Submit
          </button>
          <input
            className="new-todo"
            placeholder="Task"
            value={this.state.newTask}
            // onKeyUp={(ev: React.KeyboardEvent) => {
            //     if (ev.key === 'Enter') addTask()
            // }}
            onChange={(ev) => this.setState({ newTask: ev.currentTarget.value })}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={mins}
            onChange={(ev) => this.setState({ mins: ev.currentTarget.value })}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={secs}
            onChange={(ev) => this.setState({ secs: ev.currentTarget.value })}
          />
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
