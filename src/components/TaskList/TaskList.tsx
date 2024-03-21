import './taskList.css';
import React from 'react';

import { TTask, TTasksFilter } from '../App/App';
import Task from '../Task/Task';
import { SetterOrUpdater } from '../../utils/types';

type TaskListProps = {
  tasks: TTask[];
  setTasks: SetterOrUpdater<TTask[]>;
  filter: TTasksFilter;
};
type TaskListState = {
  filterTasks: TTask[];
};

class TaskList extends React.Component<TaskListProps, TaskListState> {
  constructor(props) {
    super(props);
    this.state = {
      filterTasks: this.filterTasks(this.props.tasks, this.props.filter),
    };
  }

  filterTasks = (tasks: TTask[], filter: TTasksFilter): TTask[] => {
    return tasks.filter((it) => {
      if (filter === 'all') return true;
      if (filter === 'active') return !it.isCompleted;
      if (filter === 'completed') return it.isCompleted;
      return false;
    });
  };

  override componentDidUpdate(prevProps: TaskListProps) {
    if (this.props.tasks !== prevProps.tasks || this.props.filter !== prevProps.filter) {
      this.setState((prevState) => ({
        ...prevState,
        filterTasks: this.filterTasks(this.props.tasks, this.props.filter),
      }));
    }
  }

  override render() {
    return (
      <>
        {this.state.filterTasks.map((it) => (
          <Task key={it.id} task={it} setTasks={this.props.setTasks} />
        ))}
      </>
    );
  }
}

/*
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
        <Task key={it.id} Task={it} setTasks={props.setTasks} />
      ))}
    </>
  );
}
*/

export default TaskList;
