import ITask from '../interface/ITask';

interface Props {
  title: string;
  tasks: ITask[];
  children?: React.ReactNode;
  renderItem: (task: ITask, index: number) => React.ReactNode;
}

const Card = ({
  title,
  tasks,
  children,
  renderItem,
}: Props) => (
  <div className="w-1/3 px-8">
    <div className="shadow-xl bg-white rounded-xl">
      <p className="border-b px-4 py-3">{title}</p>
      {!tasks.length && (
        <div className="tasks px-4 pt-4">
          <div className="p-4 bg-gray-100 mb-4 rounded-md">
            There's no data in <span className="font-semibold">{title}</span>
          </div>
        </div>
      )}
      <div className="tasks p-4">
        {tasks.map((task, index) => renderItem(task, index))}
        {children}
      </div>
    </div>
  </div>
);

Card.defaultProps = {
  children: null,
};

export default Card;
