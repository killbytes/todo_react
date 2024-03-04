import './tasksFilter.css';

function TasksFilter() {
  return (
    <>
      <li>
        <button className="selected">All</button>
      </li>
      <li>
        <button>Active</button>
      </li>
      <li>
        <button>Completed</button>
      </li>
    </>
  );
}

export default TasksFilter;
