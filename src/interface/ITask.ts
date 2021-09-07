interface ITask {
  id?: string;
  name: string;
  datetimeStarted: Date | null;
  datetimeEnded: Date | null;
  state?: 'TO DO' | 'IN PROGRESS' | 'DONE';
}

export interface IMoveTask {
  id: string;
  state: 'TO DO' | 'IN PROGRESS' | 'DONE'
}

export default ITask;
