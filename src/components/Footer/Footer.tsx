import React from 'react';
// eslint-disable-next-line prettier/prettier
import './footer.css';

import TasksFilter from '../TasksFilter/TasksFilter';
import { TTask, TTasksFilter } from '../App/App';
import { SetterOrUpdater } from '../../utils/types';

type FooterProps = {
  filter: TTasksFilter;
  setFilter: SetterOrUpdater<TTasksFilter>;
  taskCount: number;
  setTasks: SetterOrUpdater<TTask[]>;
};
type FooterState = object;

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clearCompleted = () => {
    this.props.setTasks((prevTasks) => prevTasks.filter((it) => !it.isCompleted));
  };

  override render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.taskCount} items left</span>
        <ul className="filters">
          <TasksFilter filter={this.props.filter} setFilter={this.props.setFilter} />
        </ul>
        <button type="button" className="clear-completed" onClick={this.clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;

/*
function passValue<T extends number|string>(value: T): T {
  return value
}

const number = 1
const string = 'str'
const passedNumber: number = passValue<number>(number)
const passedString: string = passValue<string>(string)
*/
