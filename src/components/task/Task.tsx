import './task.css';
import { TTask } from 'src/components/app/App';
import { formatDistanceToNow } from 'date-fns';
import { useCallback } from 'react';
import { SetterOrUpdater } from '../../utils/types';
// import { compareAsc, format } from "date-fns";

const mapTaskStateToClassName = (task: TTask) => {
  if (task.isEditing) return 'editing';
  if (task.isCompleted) return 'completed';
  return '';
};

type TaskProps = {
  task: TTask;
  setTasks: SetterOrUpdater<TTask[]>;
};

function Task(props: TaskProps) {
  const {
    task: { id, isCompleted, isEditing, createdAt, description },
    setTasks,
  } = props;

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
      {isEditing && <input type="text" className="edit" value={description} />}
    </li>
  );
}

export default Task;
