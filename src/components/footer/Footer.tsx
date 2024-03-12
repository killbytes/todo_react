// eslint-disable-next-line prettier/prettier
import './footer.css';

import TasksFilter from '../tasksFilter/TasksFilter';
import { TTasksFilter } from '../app/App';
import { SetterOrUpdater } from '../../utils/types';

type FooterProps = {
  filter: TTasksFilter;
  setFilter: SetterOrUpdater<TTasksFilter>;
};

function Footer(props: FooterProps) {
  return (
    <>
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        <ul className="filters">
          <TasksFilter filter={props.filter} setFilter={props.setFilter} />
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    </>
  );
}

export default Footer;
