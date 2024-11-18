import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { ITask } from '../../dto/ITask';
import { IUserProps } from '../../dto/IUserProps';
import {
  notifyErrorPopUp,
  notifySuccessPopUp,
} from '../../utils/notify-popups';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { api } from '../../services/api';

interface DeleteTaskModalProps {
  task: ITask;
  user: IUserProps;
  index: number;
  isDeleteTaskModalOpen: boolean;
  closeDeleteTaskModal: () => void;
  setUser: (user: IUserProps) => void;
}

export function DeleteTaskModal({
  task,
  user,
  index,
  isDeleteTaskModalOpen,
  setUser,
  closeDeleteTaskModal,
}: DeleteTaskModalProps) {
  const { user: authUser } = useAuth();
  const { theme } = useTheme();

  const [bgColor, setBgColor] = useState('bg-black/0');
  const [scaleClass, setScaleClass] = useState('scale-0');
  const [opacityClass, setOpacityClass] = useState('opacity-0');

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

      notifySuccessPopUp('Tarefa excluída com sucesso!', theme);
    } catch (error) {
      notifyErrorPopUp('Erro ao excluir tarefa!', theme);

      console.log(error);
    }
  }

  function handleCloseModalWithEscKey(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    if (event.key === 'Escape') {
      closeDeleteTaskModal();
    }
  }

  function handleCloseModal() {
    setScaleClass('scale-0');
    setOpacityClass('opacity-0');

    setTimeout(() => {
      closeDeleteTaskModal();
    }, 200);
  }

  useEffect(() => {
    if (isDeleteTaskModalOpen) {
      document.body.style.overflow = 'hidden';
      setScaleClass('scale-100');
      setOpacityClass('opacity-100');
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDeleteTaskModalOpen]);

  useEffect(() => {
    if (theme === 'light') {
      setBgColor('bg-black/20');
    } else {
      setBgColor('bg-black/40');
    }

    setScaleClass('scale-100');
  }, [theme]);

  return (
    <div
      tabIndex={0}
      onKeyUp={(event) => handleCloseModalWithEscKey(event)}
      className={`${
        isDeleteTaskModalOpen === false ? 'hidden' : ''
      } w-full h-full fixed z-20 ${bgColor} ${opacityClass} transition-all duration-500 backdrop-blur-xs`}
    >
      <div
        className={`${scaleClass} transition-transform duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] modal-shadow rounded-xl rounded-b-xl overflow-hidden ${
          theme === 'light' ? 'bg-white' : 'bg-[#474747]'
        }`}
      >
        <IoMdClose
          size={20}
          onClick={handleCloseModal}
          className={`absolute z-10 top-4 right-4 cursor-pointer text-[#757575] ${
            theme === 'light' ? 'hover:text-black' : 'hover:text-white'
          } transition-colors`}
        />

        <div
          className={`relative flex items-center justify-start w-full px-8 py-4 rounded-t-xl overflow-hidden`}
        >
          <p
            className={`font-quicksand font-semibold text-center ${
              theme === 'light' ? 'text-[#505050]' : 'text-white'
            }`}
          >
            Deletar tarefa
          </p>
        </div>

        <div
          className={`flex items-center justify-start h-full px-8 pt-2 pb-6`}
        >
          <p
            className={`${
              theme === 'light' ? 'text-[#707070]' : 'text-[#EAEAEA]'
            }`}
          >
            Tem certeza que deseja excluir essa tarefa?
          </p>
        </div>

        <div className='w-full flex justify-end px-6 py-5 gap-3'>
          <button
            onClick={() => handleDeleteTask()}
            className={`font-semibold p-2 text-white transition-all duration-200 shadow ${
              theme === 'light'
                ? 'bg-[#FF0000] hover:bg-[#e41919]'
                : 'bg-[#A72020] hover:brightness-110'
            } rounded-md px-8 py-2`}
          >
            Deletar
          </button>
          <button
            onClick={handleCloseModal}
            className={`font-semibold p-2 transition-all duration-200 shadow ${
              theme === 'light'
                ? 'text-[#2B2B2B] bg-[#EAEAEA] hover:brightness-95'
                : 'text-white bg-[#535353] hover:brightness-105'
            } rounded-md px-8 py-2`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
