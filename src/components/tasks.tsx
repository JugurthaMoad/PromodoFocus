import { FunctionComponent, useState, useRef } from "react";
import { Options, Add, Done } from "./logos";
interface TasksProps {
  option: number;
}
type task = {
  title?: string;
  est: number;
  done: boolean;
};
const Tasks: FunctionComponent<TasksProps> = ({ option }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [numberTasks, setNumber] = useState(0);
  const inputRef = useRef<any>(null);
  const [tasks, setTasks] = useState<any>([]);
  const hundleOption = (option: number) => {
    let section = option === 0 ? "Time to focus" : "Time for a break!";
    return section;
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
  const addTask = ({ title, est }: task) => {
    let t: task = { title: title, est: est, done: false };
    let ts: task[] = tasks;
    ts.push(t);
    setTasks(ts);
    console.log("taks = ", tasks);
  };
  const hundleClose = () => {
    setShowTasks(false);
    setNumber(0);
    inputRef.current.value = "";
  };
  const hundleAddTask = () => {
    console.log("input = ", inputRef.current.value);
    console.log("est = ", numberTasks);
    let t: task = {
      title: inputRef.current.value,
      est: numberTasks,
      done: false,
    };
    addTask(t);
    hundleClose();
  };

  const displayTasks = () => {
    return (
      <ul className="display_tasks_container">
        {tasks.map((t: task, i: number) => {
          return (
            <li key={i}>
              <span className="task_container">
                <Done />
                <span className="done">{t.title}</span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

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
              <li>clear finished tasks</li>
              <li>clear act pomodoros</li>
              <li>Save as template</li>
              <li>clear all tasks</li>
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
