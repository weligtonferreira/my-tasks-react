import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { z } from 'zod';

import {
  notifyErrorPopUp,
  notifySuccessPopUp,
} from '../../utils/notify-popups';
import { handleNotifyValidationErrors } from '../../utils/handle-notify-validation-errors';
import { IUserProps } from '../../dto/IUserProps';
import { createTaskSchema } from '../../schemas/taskSchema';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

interface CreateTaskModalProps {
  user: IUserProps;
  isCreateTaskModalOpen: boolean;
  setUser: (user: IUserProps) => void;
  closeCreateTaskModal: () => void;
}

type CreateTaskInputData = z.infer<typeof createTaskSchema>;

export function CreateTaskModal({
  user,
  isCreateTaskModalOpen,
  setUser,
  closeCreateTaskModal,
}: CreateTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskInputData>();
  const { user: authUser } = useAuth();

  const [bgColor, setBgColor] = useState('bg-black/0');
  const [scaleClass, setScaleClass] = useState('scale-0');

  async function handleCreateTask(createTaskInputData: CreateTaskInputData) {
    try {
      const newTask = await api
        .post(`/tasks/${user?.id}`, createTaskInputData, {
          headers: { Authorization: `Bearer ${authUser?.token}` },
        })
        .then((res) => res.data);

      const updatedTasks = user.tasks;
      updatedTasks.push(newTask);

      const updatedUser = {
        ...user,
        tasks: updatedTasks,
        tasksCount: user.tasksCount + 1,
      };
      setUser(updatedUser);

      closeCreateTaskModal();

      notifySuccessPopUp('Tarefa adicionada com sucesso!');
    } catch (error) {
      notifyErrorPopUp('Erro ao criar tarefa!');

      console.error(error);
    }
  }

  function handleCloseModal(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      closeCreateTaskModal();
    }
  }

  useEffect(() => {
    if (isCreateTaskModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCreateTaskModalOpen]);

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
            Criar nova tarefa
          </p>

          <IoMdClose
            size={20}
            onClick={closeCreateTaskModal}
            className='absolute right-4 cursor-pointer text-[#757575] hover:text-black transition-colors'
          />
        </div>

        <form
          onSubmit={handleSubmit(handleCreateTask, (formErrors) =>
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
              {...register('title', { required: 'O título é obrigatório' })}
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
              onClick={closeCreateTaskModal}
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
