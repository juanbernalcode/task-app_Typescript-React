import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toogleDoneTask = (i: number): void => {
    const newTasks: ITask[]= [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const DeleteTask = (i: number): void => {
    const newTasks: ITask[]= [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }
  

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                  ref={taskInput}
                />
                <button type="button" className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 className="text-center" style={{ textDecoration: t.done ? 'line-through' : '' }}>{t.name}</h2>
              <button className={t.done ? "btn btn-primary" : "btn btn-secondary"} onClick={() => toogleDoneTask(i)}>
                {t.done ? '✓' : '✗'}
              </button>
              <button className="btn btn-danger" onClick={() => DeleteTask(i)}>
              🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
