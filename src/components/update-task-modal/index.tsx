import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { z } from 'zod';

import { updateTaskSchema } from '../../schemas/taskSchema';
import {
  notifyErrorPopUp,
  notifySuccessPopUp,
} from '../../utils/notify-popups';
import { handleNotifyValidationErrors } from '../../utils/handle-notify-validation-errors';
import { IUserProps } from '../../dto/IUserProps';
import { ITask } from '../../dto/ITask';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

interface UpdateTaskModalProps {
  user: IUserProps;
  task: ITask;
  taskIndex: number;
  isUpdateTaskModalOpen: boolean;
  setUser: (user: IUserProps) => void;
  closeUpdateTaskModal: () => void;
}

type UpdateTaskInputData = z.infer<typeof updateTaskSchema>;

export function UpdateTaskModal({
  user,
  task,
  taskIndex,
  isUpdateTaskModalOpen,
  setUser,
  closeUpdateTaskModal,
}: UpdateTaskModalProps) {
  const { register, reset, handleSubmit } = useForm<UpdateTaskInputData>({
    defaultValues: { title: task.title, description: task.description },
  });
  const { user: authUser } = useAuth();
  const { theme } = useTheme();

  const [bgColor, setBgColor] = useState('bg-black/0');
  const [scaleClass, setScaleClass] = useState('scale-0');
  const [opacityClass, setOpacityClass] = useState('opacity-0');

  async function handleUpdateTask(createTaskInputData: UpdateTaskInputData) {
    try {
      await api
        .put(`/tasks/${task?.id}`, createTaskInputData, {
          headers: { Authorization: `Bearer ${authUser?.token}` },
        })
        .then((res) => res.data);

      const updatedTasks = user.tasks;

      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        title: createTaskInputData.title ?? task.title,
        description: createTaskInputData.description ?? task.description,
      };

      const updatedUser = { ...user, tasks: updatedTasks };
      setUser(updatedUser);

      closeUpdateTaskModal();

      notifySuccessPopUp('Tarefa atualizada com sucesso!', theme);
    } catch (error) {
      notifyErrorPopUp('Erro ao atualizar tarefa!', theme);

      console.error(error);
    }
  }

  function handleCloseModalWithEscKey(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    if (event.key === 'Escape') {
      closeUpdateTaskModal();
    }
  }

  function handleCloseModal() {
    setScaleClass('scale-0');
    setOpacityClass('opacity-0');

    setTimeout(() => {
      closeUpdateTaskModal();
    }, 200);
  }

  useEffect(() => {
    if (task && isUpdateTaskModalOpen) {
      reset({ title: task.title, description: task.description });
    }
  }, [task, isUpdateTaskModalOpen, reset]);

  useEffect(() => {
    if (isUpdateTaskModalOpen) {
      document.body.style.overflow = 'hidden';
      setScaleClass('scale-100');
      setOpacityClass('opacity-100');
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isUpdateTaskModalOpen]);

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
        isUpdateTaskModalOpen === false ? 'hidden' : ''
      } w-full h-full fixed z-20 ${bgColor} ${opacityClass} transition-all duration-500 backdrop-blur-xs`}
    >
      <div
        className={`${scaleClass} transition-transform duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] modal-shadow rounded-xl rounded-b-xl overflow-hidden ${
          theme === 'light' ? 'bg-white' : 'bg-[#535353]'
        } px-6 pt-3 pb-6`}
      >
        <IoMdClose
          size={20}
          onClick={handleCloseModal}
          className={`absolute z-10 top-4 right-4 cursor-pointer ${
            theme === 'light'
              ? 'text-[#757575] hover:text-black'
              : 'text-white hover:text-[#B9B9B9]'
          } transition-colors`}
        />

        <div className='relative flex items-center justify-center w-full rounded-t-xl overflow-hidden'>
          <p
            className={`font-quicksand font-semibold text-center text-[#505050] ${
              theme === 'light' ? 'text-[#505050]' : 'text-white'
            }`}
          >
            Editar tarefa
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateTask, (formErrors) =>
            handleNotifyValidationErrors(formErrors, theme)
          )}
          className='w-full'
        >
          <div className='flex flex-col gap-2 py-8'>
            <label
              htmlFor='title'
              className={`${
                theme === 'light' ? 'text-[#676767]' : 'text-white'
              }`}
            >
              Título
            </label>
            <input
              id='title'
              type='text'
              {...register('title', {
                required: 'O título é obrigatório',
              })}
              maxLength={50}
              placeholder='Escreva o título'
              className={`outline-none rounded-md p-2 resize-none transition-colors ${
                theme === 'light'
                  ? 'text-[#707070] border focus:border-gray-300'
                  : 'text-white bg-[#5E5E5E] border border-[#4b4b4b] focus:border-[#818181]'
              }`}
            />

            <label
              htmlFor='description'
              className={`${
                theme === 'light' ? 'text-[#676767]' : 'text-white'
              }`}
            >
              Descrição
            </label>
            <textarea
              id='description'
              title='description'
              {...register('description')}
              placeholder='Escreva a descrição'
              rows={5}
              className={`outline-none rounded-md p-2 resize-none transition-colors ${
                theme === 'light'
                  ? 'text-[#707070] border focus:border-gray-300'
                  : 'text-white bg-[#5E5E5E] border border-[#4b4b4b] focus:border-[#818181]'
              }`}
            />
          </div>

          <div className='w-full flex flex-col items-center justify-center gap-2'>
            <button
              type='submit'
              className={`w-full rounded-md font-semibold py-3 transition-colors duration-200 shadow text-white ${
                theme === 'light'
                  ? 'bg-[#1ABD1F] hover:bg-[#26B22A]'
                  : 'bg-[#26B22A] hover:bg-[#1ABD1F]'
              }`}
            >
              Salvar
            </button>
            <button
              type='button'
              onClick={handleCloseModal}
              className={`w-full rounded-md font-semibold py-3 transition-colors duration-200 ${
                theme === 'light'
                  ? 'text-[#757575] bg-[#E5E5E5] hover:bg-[#D3D3D3] hover:text-[#444]'
                  : 'text-[#EAEAEA] bg-[#646464] hover:bg-[#696969]'
              }`}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
