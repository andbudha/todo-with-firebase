import { RiDeleteBin5Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { TaskType } from '../../features/common/types';
import { tasksThunks } from '../../redux/todolistSlice';
import { ChangeEvent, useState } from 'react';
import BarLoader from '../Loaders/BarLoader/BarLoader';

const styles = {
  list: `relative`,
  todo: `flex items-center justify-between h-[50px] w-[100%] bg-[#f4f4f5] my-2 p-3 rounded tracking-wide border border-[#f97316] text-[#09090b]`,
  checkBoxContainer: `flex items-center`,
  checkBox: `w-[20px] h-[20px] mr-2 border-2 border-slate-400 cursor-pointer accent-[#f97316]`,
  doneIcon: `font-bold`,
  trashBinIcon: `h-[22px] w-[22px] cursor-pointer text-[#09090b]`,
  info: `text-center mt-4 tracking-wide text-[#09090b]`,
};

export const TodoAppList = () => {
  const dispatch = useAppDispatch();
  const [alteredTaskId, setAlteredTaskId] = useState<number>(0);
  const todoList = useSelector<RootState, TaskType[]>(
    (state) => state.todolist.todolist
  );
  const isLoadingAlteredTask = useSelector<RootState, boolean>(
    (state) => state.todolist.isLoadingAlteredTask
  );
  const checkBoxHandler = (
    event: ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    setAlteredTaskId(taskId);
    dispatch(
      tasksThunks.updateTaskStatus({
        value: event.currentTarget.checked,
        taskID: taskId,
      })
    );
  };

  const removeTaskHandler = (taskId: number) => {
    setAlteredTaskId(taskId);
    dispatch(tasksThunks.deleteTask(taskId));
  };

  return (
    <div>
      <ul className={styles.list}>
        {todoList.map((task) => {
          return (
            <div key={task.id}>
              {isLoadingAlteredTask && task.id === alteredTaskId ? (
                <li className={styles.todo}>
                  {' '}
                  <BarLoader />
                </li>
              ) : (
                <li className={styles.todo}>
                  <div className={styles.checkBoxContainer}>
                    <input
                      className={styles.checkBox}
                      type="checkbox"
                      checked={task.isComplete}
                      onChange={(event) => checkBoxHandler(event, task.id)}
                    />
                    {task.title}
                  </div>
                  <div onClick={() => removeTaskHandler(task.id)}>
                    {' '}
                    <RiDeleteBin5Line className={styles.trashBinIcon} />
                  </div>
                </li>
              )}
            </div>
          );
        })}
      </ul>
      <div className={styles.info}>
        <h2>{`You have got ${todoList.length} tasks`}</h2>
      </div>
    </div>
  );
};
