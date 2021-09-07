/* eslint-disable no-underscore-dangle */
import { get } from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DONE, IN_PROGRESS, TODO } from '../constants/Tasks';
import ITask from '../interface/ITask';
import { moveTask } from '../store/slices/tasks';
import Button from './Button';

interface Props {
  task: ITask
}

const Task = ({ task }: Props) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(null);
  const [amount, setAmount] = useState<number | string | null>(null);
  let interval: ReturnType<typeof setInterval>;

  const parsedTimer: {
    hours: string;
    minutes: string;
    seconds: string;
  } | null = useMemo(() => {
    if (timer) {
      let hours: string | number = get(timer, 'hours');
      let minutes: string | number = get(timer, 'minutes');
      let seconds: string | number = get(timer, 'seconds');

      if (hours < 10) hours = `0${hours}`.toString();
      if (minutes < 10) minutes = `0${minutes}`.toString();
      if (seconds < 10) seconds = `0${seconds}`.toString();

      return {
        hours,
        minutes,
        seconds,
      };
    }

    return null;
  }, [timer]);

  const getAmount = (timeSpent: string, amountPerHour: number) => {
    const time = timeSpent.split(':');
    const hours = time[0];
    const mins = time[1];
    const dec = (+mins / 6) * 10;
    const computedAmount = parseFloat(`${parseInt(hours, 10)}.${dec < 10 ? '0' : ''}${dec}`);

    return parseFloat((computedAmount * amountPerHour).toString()).toFixed(2);
  };

  useEffect(() => {
    let duration: any;

    if (task.state === IN_PROGRESS) {
      interval = setInterval(() => {
        duration = moment.duration(moment().diff(moment(task.datetimeStarted)));
        setTimer(duration._data);
      }, 1000);
    }

    if (task.state === DONE) {
      duration = moment.duration(moment(task.datetimeEnded).diff(moment(task.datetimeStarted)));
      const { hours, minutes, seconds } = duration._data;
      setAmount(getAmount(`${hours}:${minutes}:${seconds}`, 10));
    }

    return () => {
      // it will rerender once it leaves the card. It will automatically clear the inerval
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-4 bg-gray-100 mb-4 rounded-md">
      <p>{task.name}</p>
      {task.state === DONE && (
        <p className="text-xl font-bold">${amount}</p>
      )}
      {task.state === IN_PROGRESS && parsedTimer && (
        <p className="text-xl font-semibold">
          {parsedTimer.hours}:{parsedTimer.minutes}:{parsedTimer.seconds}
        </p>
      )}
      {task.state !== DONE && (
        <Button
          className="bg-gray-300 rounded-md w-full py-2 mt-3"
          onClick={() => {
            dispatch(moveTask({
              id: task.id || '',
              state: task.state === TODO ? IN_PROGRESS : DONE,
            }));
          }}
        >
          {task.state === TODO ? 'Start' : 'Done'}
        </Button>
      )}
    </div>
  );
};

export default Task;
