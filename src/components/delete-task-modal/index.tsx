import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { ITask } from '../../dto/ITask';
import { IUserProps } from '../../dto/IUserProps';
import { notifySuccessPopUp } from '../../utils/notify-popups';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

interface DeleteTaskModalProps {
  task: ITask;
  user: IUserProps;
  index: number;
  closeDeleteTaskModal: () => void;
  setUser: (user: IUserProps) => void;
}

export function DeleteTaskModal({
  task,
  user,
  index,
  setUser,
  closeDeleteTaskModal,
}: DeleteTaskModalProps) {
  const { user: authUser } = useAuth();

  const [bgColor, setBgColor] = useState('bg-black/0');
  const [scaleClass, setScaleClass] = useState('scale-0');

  async function handleDeleteTask() {
    try {
      await api.delete(`/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${authUser?.token}` },
      });

      const updatedTasks = user.tasks;
      updatedTasks.splice(index, 1);

      const updatedUser = {
        ...user,
        tasks: updatedTasks,
        tasksCount: user.tasksCount - 1,
      };
      setUser(updatedUser);

      closeDeleteTaskModal();

      notifySuccessPopUp('Tarefa excluída com sucesso!');
    } catch (error) {
      console.log(error);
    }
  }

  function handleCloseModal(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      closeDeleteTaskModal();
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBgColor('bg-black/20');
      setScaleClass('scale-100');
    }, 0);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <div
      tabIndex={0}
      onKeyUp={(event) => handleCloseModal(event)}
      className={`w-full h-full absolute z-20 ${bgColor} transition-['background-color'] duration-500 backdrop-blur-xs`}
    >
      <div
        className={`${scaleClass} transition-transform duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] modal-shadow rounded-xl rounded-b-xl overflow-hidden`}
      >
        <div className='relative flex items-center justify-center w-full py-3 bg-[#FAFAFA] border-b rounded-t-xl overflow-hidden'>
          <p className='font-quicksand font-semibold text-center text-[#505050]'>
            Excluir tarefa
          </p>

          <IoMdClose
            size={20}
            onClick={closeDeleteTaskModal}
            className='absolute right-4 cursor-pointer text-[#757575] hover:text-black transition-colors'
          />
        </div>

        <div className='flex items-center justify-center bg-white h-full p-10'>
          <p className='text-[#707070] text-center'>
            Tem certeza que deseja excluir essa tarefa?
          </p>
        </div>

        <div className='w-full flex justify-evenly'>
          <button
            onClick={() => handleDeleteTask()}
            className='w-full text-white font-bold bg-black p-2'
          >
            Excluir
          </button>
          <button
            onClick={closeDeleteTaskModal}
            className='w-full text-[#2B2B2B] font-bold bg-[#EAEAEA] p-2 hover:brightness-95 transition-colors'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
