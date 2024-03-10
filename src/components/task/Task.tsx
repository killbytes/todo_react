import './task.css';
import {TTask} from 'src/components/app/App';
import {formatDistanceToNow} from 'date-fns'
import {SetterOrUpdater} from "../../utils/types";
// import { compareAsc, format } from "date-fns";


type TaskProps = {
    task: TTask
    setTasks: SetterOrUpdater<TTask[]>
}

function Task(props: TaskProps) {
    const {
      id,
      isCompleted,
      isEditing,
      createdAt,
      description
    } = props.task

    const removeTask = ()=> {
      props.setTasks(tasks=>tasks.filter(it=>it.id !== id))
    }

    return <li className={mapTaskStateToClassName(props.task)}>
        <div className="view">
            <input className="toggle" type="checkbox" checked={isCompleted}/>
            <label>
                <span className="description">{description}</span>
                <span className="created">{formatDistanceToNow(createdAt)}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy" onClick={removeTask}></button>
        </div>
        {isEditing && <input type="text" className="edit" value={description}/>}
    </li>
}

export default Task;

const mapTaskStateToClassName = (task: TTask) => {
    if (task.isEditing) return 'editing'
    if (task.isCompleted) return 'completed'
    return ''
}
