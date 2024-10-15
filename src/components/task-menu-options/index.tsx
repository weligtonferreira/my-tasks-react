import { ITask } from '../../dto/ITask';
import { useTheme } from '../../hooks/useTheme';

interface TaskMenuOptionsProps {
  task: ITask;
  index: number;
  isTaskMenuVisible: boolean;
  setIsTaskMenuVisible: (value: boolean) => void;
  openDetailsTaskModal: (task: ITask) => void;
  openUpdateTaskModal: (task: ITask, index: number) => void;
  openDeleteTaskModal: (task: ITask, index: number) => void;
}

export function TaskMenuOptions({
  task,
  index,
  isTaskMenuVisible,
  setIsTaskMenuVisible,
  openDetailsTaskModal,
  openUpdateTaskModal,
  openDeleteTaskModal,
}: TaskMenuOptionsProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        isTaskMenuVisible ? 'h-20 border opacity-100' : 'h-0 opacity-60'
      } z-10 absolute right-0 top-14 ${
        theme === 'light' ? 'bg-[#f3f3f3]' : 'bg-[#616161] border-[#505050]'
      } rounded-md overflow-hidden transition-all duration-300`}
    >
      <ul className='flex flex-col text-center select-none cursor-pointer'>
        <li
          onClick={() => {
            openDetailsTaskModal(task);
            setIsTaskMenuVisible(false);
          }}
          className={`py-1 px-3 ${
            theme === 'light' ? 'hover:bg-[#e7e7e7]' : 'hover:bg-[#6B6B6B]'
          } transition-bg-transform duration-bg-transform`}
        >
          <p
            className={`text-xs ${
              theme === 'light' ? 'text-[#636363]' : 'text-slate-200'
            } pt-1 transition-colors duration-300`}
          >
            Detalhes
          </p>
        </li>

        <li
          onClick={() => {
            openUpdateTaskModal(task, index);
            setIsTaskMenuVisible(false);
          }}
          className={`py-1 px-3 ${
            theme === 'light' ? 'hover:bg-[#e7e7e7]' : 'hover:bg-[#6B6B6B]'
          } transition-bg-transform duration-bg-transform`}
        >
          <p
            className={`text-xs ${
              theme === 'light' ? 'text-[#636363]' : 'text-slate-200'
            } transition-colors duration-300`}
          >
            Editar
          </p>
        </li>

        <li
          onClick={() => {
            openDeleteTaskModal(task, index);
            setIsTaskMenuVisible(false);
          }}
          className={`py-1 px-3 ${
            theme === 'light' ? 'hover:bg-[#e7e7e7]' : 'hover:bg-[#6B6B6B]'
          } transition-bg-transform duration-bg-transform`}
        >
          <p
            className={`text-xs ${
              theme === 'light' ? 'text-[#636363]' : 'text-slate-200'
            } pb-1 transition-colors duration-300`}
          >
            Deletar
          </p>
        </li>
      </ul>
    </div>
  );
}
