import { ITask } from './ITask';

export interface IUserProps {
  id: string;
  name: string;
  email: string;
  tasksCount: number;
  tasks: ITask[];
}
