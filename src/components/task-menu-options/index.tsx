import { ITask } from '../../dto/ITask';

interface TaskMenuOptionsProps {
  index: number;
  task: ITask;
  isTaskMenuVisible: boolean;
  setIsTaskMenuVisible: (value: boolean) => void;
  openDetailsTaskModal: (task: ITask) => void;
}

export function TaskMenuOptions({
  task,
  isTaskMenuVisible,
  setIsTaskMenuVisible,
  openDetailsTaskModal,
}: TaskMenuOptionsProps) {
  return (
    <div
      className={`${
        isTaskMenuVisible ? 'h-20 border opacity-100' : 'h-0 opacity-60'
      } z-10 absolute right-0 top-14 bg-[#f3f3f3] rounded-md overflow-hidden transition-all ease-in duration-300`}
    >
      <ul className='flex flex-col text-center select-none text-[#6F6F6F] cursor-pointer'>
        <li
          onClick={() => {
            openDetailsTaskModal(task);
            setIsTaskMenuVisible(false);
          }}
          className='py-1 px-3 hover:bg-[#e7e7e7] transition-colors'
        >
          <p className='text-xs text-[#636363] pt-1'>Detalhes</p>
        </li>
        <li className='py-1 px-3 hover:bg-[#e7e7e7] transition-colors'>
          <p className='text-xs text-[#636363]'>Editar</p>
        </li>
        <li className='py-1 px-3 hover:bg-[#e7e7e7] transition-colors'>
          <p className='text-xs text-[#636363] pb-1'>Excluir</p>
        </li>
      </ul>
    </div>
  );
}
