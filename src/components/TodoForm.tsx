import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/tasks';
import Button from './Button';

interface Props {
  className?: string
}

const TodoForm = ({
  className,
}: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addTask(name));
    setName('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  return (
    <form
      onSubmit={sendForm}
      className={className}
    >
      <textarea
        className="w-full border rounded-md resize-none p-2"
        value={name}
        onChange={onInputChange}
      />
      <Button>New Task</Button>
    </form>
  );
};

TodoForm.defaultProps = {
  className: '',
};

export default TodoForm;
