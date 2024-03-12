import './taskList.css';
import { TTask, TTasksFilter } from '../app/App';
import Task from '../task/Task';
import { SetterOrUpdater } from '../../utils/types';
import { useMemo } from 'react';

type TaskListProps = {
  tasks: TTask[];
  setTasks: SetterOrUpdater<TTask[]>;
  filter: TTasksFilter;
};

function TaskList(props: TaskListProps) {
  const filterTasks = useMemo(
    () =>
      props.tasks.filter((it) => {
        if (props.filter === 'all') return true;
        if (props.filter === 'active') return !it.isCompleted;
        if (props.filter === 'completed') return it.isCompleted;
        return false;
      }),
    [props.filter, props.tasks]
  );

  return (
    <>
      {filterTasks.map((it) => (
        <Task key={it.id} task={it} setTasks={props.setTasks} />
      ))}
    </>
  );
}

export default TaskList;
