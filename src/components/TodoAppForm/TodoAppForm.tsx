import { ChangeEvent, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
const styles = {
  formBox: `flex justify-between items-center h-[60px]`,
  inputBox: `h-[50px] p-2 w-[290px] rounded tracking-wide`,
  formButton: `flex justify-center items-center	h-[50px] w-[50px] bg-[#f97316] rounded`,
};
type TodoAppForm = {};
export const TodoAppForm = (props: TodoAppForm) => {
  const [inputValue, setInputValue] = useState('');

  const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addTaskHandler = () => {
    console.log(inputValue);
    setInputValue('');
  };
  return (
    <div>
      <div className={styles.formBox}>
        <input
          value={inputValue}
          className={styles.inputBox}
          type="text"
          placeholder="Add new task..."
          onChange={inputValueHandler}
        />
        <button className={styles.formButton} onClick={addTaskHandler}>
          <GrAdd />
        </button>
      </div>
    </div>
  );
};
