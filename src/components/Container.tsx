import { get } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { DONE, IN_PROGRESS, TODO } from '../constants/Tasks';
import ITask from '../interface/ITask';
import Card from './Card';
import TodoForm from './TodoForm';
import Task from './Task';

const Container = () => {
  const tasks = useSelector((state) => get(state, 'tasks'));

  const splittedTasks = useMemo(() => ({
    todos: tasks.filter((task: ITask) => task.state === TODO),
    inProgress: tasks.filter((task: ITask) => task.state === IN_PROGRESS),
    done: tasks.filter((task: ITask) => task.state === DONE),
  }), [tasks]);

  return (
    <div className="container flex py-8">
      <Card
        title={TODO}
        tasks={splittedTasks.todos}
        renderItem={(task) => (
          <Task key={task.id} task={task} />
        )}
      >
        <TodoForm className={classNames(!!splittedTasks.todos.length && 'mt-2')} />
      </Card>
      <Card
        title={IN_PROGRESS}
        tasks={splittedTasks.inProgress}
        renderItem={(task) => (
          <Task key={task.id} task={task} />
        )}
      />
      <Card
        title={DONE}
        tasks={splittedTasks.done}
        renderItem={(task) => (
          <Task key={task.id} task={task} />
        )}
      />
    </div>
  );
};

export default Container;
