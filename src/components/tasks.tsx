import { FunctionComponent, useState, useRef, useEffect } from "react";
import { Options, Add, Done } from "./logos";
interface TasksProps {
  option: number;
  status: boolean;
}
type task = {
  id: number;
  title?: string;
  est: number;
  done: boolean;
  rep: number;
};
const Tasks: FunctionComponent<TasksProps> = ({ option, status }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [numberTasks, setNumber] = useState(0);
  const inputRef = useRef<any>(null);
  const [tasks, setTasks] = useState<any>([]);
  const task_not_finished = useRef<any>([]);
  const [updtate, setUpdate] = useState(false); // to update te frame
  const id_tasks = useRef<number>(0);
  const n_work = useRef<number>(0);
  const [st, setSt] = useState(status);
  const hundleOption = (option: number) => {
    let section = option === 0 ? "Time to focus" : "Time for a break!";
    return section;
  };
  const modifyTask = (id_task: number) => {
    const tab = tasks;
    tab.forEach((t: task) => {
      if (t.id === id_task) {
        t.done = true;
      }
    });
    n_work.current = 0;
    setTasks(tab);
    console.log("tasjs ) ", tasks);
  };
  const timesWork = () => {
    if (status === true) {
      if (task_not_finished.current.length !== 0) {
        n_work.current += 1;
        if (task_not_finished.current[0] !== undefined) {
          task_not_finished.current[0].rep += 1;
          if (
            task_not_finished.current[0].rep ===
            task_not_finished.current[0].est
          ) {
            modifyTask(task_not_finished.current[0].id);
          }
        }

        status = false;
        setSt(status);
      }
    }
  };
  const getId = () => {
    return (id_tasks.current += 1);
  };
  const addTask_not_finished = () => {
    let tab = tasks.filter((task: task) => task.done === false);
    task_not_finished.current = { ...tab };
    console.log("finish = ", task_not_finished.current);
    setUpdate(!updtate);
    // console.log("tasks not finished = ", task_not_finished);
  };
  const clearAllTasks = () => {
    let tab: any[] = [];
    setTasks(tab);
    addTask_not_finished();
    setShowOptions(!showOptions);
  };
  const deleteFinishedTasks = () => {
    let tab = tasks.filter((t: task) => t.done === false);
    addTask_not_finished();
    setTasks(tab);
    setShowOptions(!showOptions);
  };
  const hundleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const hundleTaskClick = () => {
    setShowTasks(true);
  };

  const hundleAdd = () => {
    setNumber(numberTasks + 1);
  };
  const hundleSub = () => {
    setNumber(numberTasks - 1);
  };
  const addTask = ({ id, title, est, rep }: task) => {
    let t: task = { id: id, title: title, est: est, done: false, rep: 0 };
    let ts: task[] = tasks;
    ts.push(t);
    setTasks(ts);
    addTask_not_finished();
    setUpdate(!updtate);
  };
  const hundleClose = () => {
    setShowTasks(false);
    setNumber(0);
    inputRef.current.value = "";
  };

  const hundleAddTask = () => {
    let t: task = {
      id: getId(),
      title: inputRef.current.value,
      est: numberTasks,
      done: false,
      rep: 0,
    };
    addTask(t);
    hundleClose();
  };

  const hundleDoneStatus = (id_task: number) => {
    const tab = tasks;
    tab.forEach((task: task) => {
      if (task.id === id_task) {
        task.done = !task.done;
        setTasks(tab);
        addTask_not_finished();
      }
      setUpdate(!updtate);
    });
  };

  const displayTasks = () => {
    return (
      <ul className="display_tasks_container">
        {tasks.map((t: task, i: number) => {
          return (
            <li key={i}>
              <span className="task_container">
                <span
                  className="_container"
                  onClick={() => {
                    hundleDoneStatus(t.id);
                  }}
                >
                  <Done />
                </span>
                <span className={t.done ? "done" : "notDone"}>{t.title}</span>
                rep = {t.rep} / {t.est}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };
  // timesWork();
  useEffect(() => {
    setSt(status);
    addTask_not_finished();
    console.log("St = ", st);
    timesWork();
    setUpdate(!updtate);
  }, [st, status]);
  return (
    <div className="tasks_container">
      <span className="tasks_title">{hundleOption(option)}</span>
      <div className="tasks_info">
        <span className="tasks_text">Tasks</span>

        <div className="tasks_options_container">
          <span onClick={hundleOptionsClick} className="tasks_opt_button">
            <Options />
          </span>
          <div className={showOptions ? "tasks_options" : "hide"}>
            <ul>
              <li onClick={deleteFinishedTasks}>clear finished tasks *</li>
              <li>clear act pomodoros</li>
              <li>Save as template</li>
              <li onClick={clearAllTasks}>clear all tasks *</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="task_add_container">
        {displayTasks()}
        <span onClick={hundleTaskClick} className="tasks_add_button">
          <span className="task_tb">
            <Add />
            Add Task
          </span>
        </span>
        <div className={showTasks ? "task_add_form" : "hide"}>
          <input
            ref={inputRef}
            type="text"
            autoFocus
            className="task_input"
            placeholder="What are you working on ?"
          />
          Est Pomodoros
          <span className="task_input_number_container">
            <span className="task_input_number">{numberTasks}</span>
            <span className="task_input_number_buttons">
              <span onClick={hundleAdd} className="task_input_number_button">
                {" "}
                +{" "}
              </span>
              <span onClick={hundleSub} className="task_input_number_button">
                {" "}
                -{" "}
              </span>
            </span>
          </span>
          <div className="task_add_buttons">
            <span onClick={hundleClose} className="task_add_b">
              Cancel
            </span>
            <span onClick={hundleAddTask} className="task_add_b">
              Save
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
