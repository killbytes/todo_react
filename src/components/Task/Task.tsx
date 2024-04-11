import './task.css';
import { TTask } from 'src/components/App/App';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import { SetterOrUpdater } from '../../utils/types';
// import { compareAsc, format } from "date-fns";

const mapTaskStateToClassName = (task: TTask) => {
  if (task.isEditing) return 'editing';
  if (task.isCompleted) return 'completed';
  if (!task.isCompleted) return 'active';
  return '';
};
function getTimeFromTimer(timer: TTask['timer']) {
  if (!timer) return undefined;
  const start = +timer.createdTime;
  const end = timer.pauseTime ? +timer.pauseTime : +new Date();
  const pauseTime = timer.pauseSum;
  let remaining = timer.duration - (end - start - pauseTime);
  if (remaining < 0) remaining = 0;
  const mins = Math.floor(remaining / 1000 / 60);
  const secs = Math.floor(remaining / 1000 - mins * 60);
  return [mins, secs] as [number, number];
}

type TaskProps = {
  task: TTask;
  setTasks: SetterOrUpdater<TTask[]>;
};
type TasksState = {
  editDescription: string;
  time: [mins: number, secs: number] | undefined;
};

class Task extends React.Component<TaskProps, TasksState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      editDescription: this.props.task.description,
      time: getTimeFromTimer(this.props.task.timer),
    };
  }

  intervalId: NodeJS.Timeout | undefined;

  override componentDidMount() {
    this.intervalId = setInterval(() => this.setState({ time: getTimeFromTimer(this.props.task.timer) }), 1000);
  }

  override componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  setEditDescription = (editDescription) => {
    this.setState((prevState) => ({
      ...prevState,
      editDescription,
    }));
  };

  setIsCompleted = (isCompleted: boolean) => {
    this.props.setTasks((prevTasks) =>
      prevTasks.map((prevTask) => {
        if (prevTask.id === this.props.task.id) {
          return { ...prevTask, isCompleted };
        }
        return prevTask;
      })
    );
  };

  finishEdit = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      this.props.setTasks((tasks) =>
        tasks.map((prevTask) => {
          if (prevTask === this.props.task) {
            return {
              ...prevTask,
              description: this.state.editDescription,
              isEditing: false,
            };
          }
          return prevTask;
        })
      );
    }
  };

  editTask() {
    this.props.setTasks((tasks) =>
      tasks.map((prevTask) => {
        if (prevTask === this.props.task) {
          return {
            ...prevTask,
            isEditing: true,
          };
        }
        return prevTask;
      })
    );
  }

  pauseTimer = () => {
    const { timer } = this.props.task;
    if (timer && !timer.pauseTime)
      this.props.setTasks((tasks) =>
        tasks.map((it) => {
          if (it.id === this.props.task.id)
            return {
              ...this.props.task,
              timer: {
                ...timer,
                pauseTime: new Date(),
              },
            };
          return it;
        })
      );
  };

  resumeTimer = () => {
    const { timer } = this.props.task;
    if (timer && timer.pauseTime)
      this.props.setTasks((tasks) =>
        tasks.map((it) => {
          if (it.id === this.props.task.id)
            return {
              ...this.props.task,
              timer: {
                ...timer,
                pauseTime: undefined,
                pauseSum: timer.pauseSum + (+new Date() - +timer.pauseTime!),
              },
            };
          return it;
        })
      );
  };

  removeTask = () => {
    const { id } = this.props.task;
    this.props.setTasks((tasks) => tasks.filter((it) => it.id !== id));
  };

  override render() {
    const { time } = this.state;

    return (
      <li className={mapTaskStateToClassName(this.props.task)}>
        <div className="view">
          <input
            onChange={(ev) => this.setIsCompleted(ev.currentTarget.checked)}
            className="toggle"
            type="checkbox"
            checked={this.props.task.isCompleted}
          />
          <label>
            <span className="description">{this.props.task.description}</span>
            {time && (
              <span className="description timer">
                <button type="button" className="icon icon-play" onClick={this.resumeTimer} />
                <button type="button" className="icon icon-pause" onClick={this.pauseTimer} />
                <span>
                  {time[0]}:{time[1]}
                </span>
              </span>
            )}
            <span className="created">{formatDistanceToNow(this.props.task.createdAt)}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.editTask.bind(this)} />
          <button type="button" className="icon icon-destroy" onClick={this.removeTask} />
        </div>
        {this.props.task.isEditing && (
          <input
            type="text"
            className="edit"
            value={this.state.editDescription}
            onKeyUp={this.finishEdit}
            onChange={(ev) => this.setEditDescription(ev.currentTarget.value)}
          />
        )}
      </li>
    );
  }
}

/*
function Task(props: TaskProps) {
  const {
    Task: { id, isCompleted, isEditing, createdAt, description },
    setTasks,
  } = props;
  const [editDescription, setEditDescription] = useState(description);

  const removeTask = () => {
    props.setTasks((tasks) => tasks.filter((it) => it.id !== id));
  };

  const editTask = () => {
    props.setTasks((tasks) =>
      tasks.map((it) => {
        const prevObj = it;
        if (it === props.Task) {
          return { ...prevObj, isEditing: !it.isEditing };
        }
        return it;
      })
    );
  };

  const keyUp = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      props.setTasks((tasks) =>
        tasks.map((it) => {
          const prevObj = it;
          if (it === props.Task) {
            return { ...prevObj, description: editDescription, isEditing: !it.isEditing };
          }
          return it;
        })
      );
    }
  };

  const setIsCompleted = useCallback(
    (isCompleted: boolean) =>
      setTasks((prevTasks) =>
        prevTasks.map((Task) => {
          if (Task.id === id) {
            const prevObj = Task;
            return { ...prevObj, isCompleted };
          }
          return Task;
        })
      ),
    [id, setTasks]
  );

  return (
    <li className={mapTaskStateToClassName(props.Task)}>
      <div className="view">
        <input
          onChange={(ev) => setIsCompleted(ev.currentTarget.checked)}
          className="toggle"
          type="checkbox"
          checked={isCompleted}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">{formatDistanceToNow(createdAt)}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={editTask} />
        <button type="button" className="icon icon-destroy" onClick={removeTask} />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editDescription}
          onKeyUp={keyUp}
          onChange={(ev) => setEditDescription(ev.currentTarget.value)}
        />
      )}
    </li>
  );
}
*/

export default Task;
