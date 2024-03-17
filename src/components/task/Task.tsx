import './task.css';
import { TTask } from 'src/components/app/App';
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

type TaskProps = {
  task: TTask;
  setTasks: SetterOrUpdater<TTask[]>;
};
type TasksState = {
  editDescription: string;
};

class Task extends React.Component<TaskProps, TasksState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      editDescription: this.props.task.description,
    };
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

  removeTask = () => {
    const { id } = this.props.task;
    this.props.setTasks((tasks) => tasks.filter((it) => it.id !== id));
  };

  override render() {
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
    task: { id, isCompleted, isEditing, createdAt, description },
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
        if (it === props.task) {
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
          if (it === props.task) {
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
        prevTasks.map((task) => {
          if (task.id === id) {
            const prevObj = task;
            return { ...prevObj, isCompleted };
          }
          return task;
        })
      ),
    [id, setTasks]
  );

  return (
    <li className={mapTaskStateToClassName(props.task)}>
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
