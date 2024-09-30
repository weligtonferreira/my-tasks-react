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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskInputData>({
    defaultValues: { title: task.title, description: task.description },
  });
  const [bgColor, setBgColor] = useState('bg-black/0');
  const [scaleClass, setScaleClass] = useState('scale-0');

  async function handleUpdateTask(createTaskInputData: UpdateTaskInputData) {
    try {
      await api
        .put(`/tasks/${task?.id}`, createTaskInputData)
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

      notifySuccessPopUp('Tarefa atualizada com sucesso!');
    } catch (error) {
      notifyErrorPopUp('Erro ao atualizar tarefa!');

      console.error(error);
    }
  }

  function handleCloseModal(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      closeUpdateTaskModal();
    }
  }

  useEffect(() => {
    if (isUpdateTaskModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isUpdateTaskModalOpen]);

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
            Editar tarefa
          </p>

          <IoMdClose
            size={20}
            onClick={closeUpdateTaskModal}
            className='absolute right-4 cursor-pointer text-[#757575] hover:text-black transition-colors'
          />
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateTask, (formErrors) =>
            handleNotifyValidationErrors(formErrors)
          )}
          className='w-full'
        >
          <div className='flex flex-col gap-2 bg-white px-8 pt-8 pb-10'>
            <label htmlFor='title' className='text-[#676767]'>
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
              className='outline-none border rounded-md text-[#707070] p-2 focus:border-gray-300 transition-colors'
            />
            {errors?.title?.message && (
              <p className='text-sm font-sans text-red-500'>
                {errors.title.message}
              </p>
            )}

            <label htmlFor='description' className='text-[#676767]'>
              Descrição
            </label>
            <textarea
              id='description'
              title='description'
              {...register('description')}
              placeholder='Escreva a descrição'
              rows={5}
              className='outline-none border rounded-md text-[#707070] p-2 resize-none focus:border-gray-300 transition-colors'
            />
          </div>

          <div className='w-full flex justify-evenly'>
            <button
              type='submit'
              className='w-full text-white font-bold bg-[#229DB8] p-2 hover:brightness-105 transition-colors'
            >
              Salvar
            </button>
            <button
              onClick={closeUpdateTaskModal}
              className='w-full text-[#2B2B2B] font-bold bg-[#EAEAEA] p-2 hover:brightness-95 transition-colors'
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
