import './tasksFilter.css';
import { TTasksFilter } from '../app/App';
import { SetterOrUpdater } from '../../utils/types';

type TasksFooterProps = {
  filter: TTasksFilter;
  setFilter: SetterOrUpdater<TTasksFilter>;
};

function TasksFilter(props: TasksFooterProps) {
  return (
    <>
      <li>
        <button
          className={props.filter === 'all' ? 'selected' : ''}
          onClick={() => props.setFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={props.filter === 'active' ? 'selected' : ''}
          onClick={() => props.setFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={props.filter === 'completed' ? 'selected' : ''}
          onClick={() => props.setFilter('completed')}
        >
          Completed
        </button>
      </li>
    </>
  );
}

export default TasksFilter;
