// eslint-disable-next-line prettier/prettier
import './footer.css';

import TasksFilter from '../tasksFilter/tasksFilter';

function Footer() {
  return (
    <>
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        <ul className="filters">
          <TasksFilter />
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    </>
  );
}

export default Footer;
