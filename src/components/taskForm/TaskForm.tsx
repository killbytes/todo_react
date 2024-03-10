import './taskForm.css';
import {TTask} from "../app/App";
import {SetterOrUpdater} from "../../utils/types";
import {useState} from "react";
import * as uuid from 'uuid';

type TaskFormProps = {
    setTasks: SetterOrUpdater<TTask[]>;
}

function TaskForm(props: TaskFormProps) {

    const [description, setDescription] = useState('');

    const addTask = () => props.setTasks(tasks => [{
        id: uuid.v4(),
        isCompleted: false,
        isEditing: false,
        createdAt: new Date(),
        description: description
    }, ...tasks])

    return (
        <header className="header">

            <form
                style={{display: 'contents'}}
                onSubmit={ev=> {
                    ev.preventDefault()
                    addTask()
                }}
            >
                <h1>Todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    value={description}
                    // onKeyUp={ev={
                    //     if (ev.key === 'Enter') addTask()
                    // }}
                    onChange={ev => setDescription(ev.currentTarget.value)}
                />
            </form>
        </header>
    );
}

export default TaskForm;
