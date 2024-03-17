import './tasksFilter.css';
import React from 'react';

import { TTasksFilter } from '../App/App';
import { SetterOrUpdater } from '../../utils/types';

type TasksFooterProps = {
  filter: TTasksFilter;
  setFilter: SetterOrUpdater<TTasksFilter>;
};

class TasksFilter extends React.Component<TasksFooterProps> {
  // constructor(props) {
  //   super(props);
  // }

  override render() {
    return (
      <>
        <li>
          <button
            type="button"
            className={this.props.filter === 'all' ? 'selected' : ''}
            onClick={() => this.props.setFilter('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={this.props.filter === 'active' ? 'selected' : ''}
            onClick={() => this.props.setFilter('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={this.props.filter === 'completed' ? 'selected' : ''}
            onClick={() => this.props.setFilter('completed')}
          >
            Completed
          </button>
        </li>
      </>
    );
  }
}
/*

function TasksFilter(props: TasksFooterProps) {
  return (
    <>
      <li>
        <button
          type="button"
          className={props.filter === 'all' ? 'selected' : ''}
          onClick={() => props.setFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={props.filter === 'active' ? 'selected' : ''}
          onClick={() => props.setFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={props.filter === 'completed' ? 'selected' : ''}
          onClick={() => props.setFilter('completed')}
        >
          Completed
        </button>
      </li>
    </>
  );
}
*/

export default TasksFilter;
