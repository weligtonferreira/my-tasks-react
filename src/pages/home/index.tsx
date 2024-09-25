import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import { Header } from '../../components/header';
import { TaskCard } from '../../components/task-card';
import { AddButton } from '../../components/add-button';
import { CreateTaskModal } from '../../components/create-task-modal';
import { DetailsTaskModal } from '../../components/details-task-modal';
import { UpdateTaskModal } from '../../components/update-task-modal';
import { DeleteTaskModal } from '../../components/delete-task-modal';

import { ITask } from '../../dto/ITask';
import { IUserProps } from '../../dto/IUserProps';
import { useFetchUserData } from '../../hooks/useFetchUserData';

export function HomePage() {
  const { user, setUser } = useFetchUserData();

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isDetailsTaskModalOpen, setIsDetailsTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [task, setTask] = useState<ITask>();
  const [taskIndex, setTaskIndex] = useState<number>(0);

  function openCreateTaskModal() {
    setIsCreateTaskModalOpen(true);
  }

  function closeCreateTaskModal() {
    setIsCreateTaskModalOpen(false);
  }

  function openDetailsTaskModal(task: ITask) {
    setTask(task);

    setIsDetailsTaskModalOpen(true);
  }

  function closeDetailsTaskModal() {
    setIsDetailsTaskModalOpen(false);
  }

  function openUpdateTaskModal(task: ITask, index: number) {
    setTask(task);
    setTaskIndex(index);

    setIsUpdateTaskModalOpen(true);
  }

  function closeUpdateTaskModal() {
    setIsUpdateTaskModalOpen(false);
  }

  function openDeleteTaskModal(task: ITask, index: number) {
    setTask(task);
    setTaskIndex(index);

    setIsDeleteTaskModalOpen(true);
  }

  function closeDeleteTaskModal() {
    setIsDeleteTaskModalOpen(false);
  }

  return (
    <div className='flex flex-col h-full w-full bg-light'>
      <Header />

      <main className='flex flex-col items-center justify-start h-full w-full p-5'>
        {user?.tasksCount ?? 0 > 0 ? (
          <div className='flex flex-col items-center justify-center w-full sm:max-w-[70vw] gap-6 p-5'>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-1'>
                <FiCheckCircle
                  size={25}
                  strokeWidth={3}
                  className='font-bold text-[#505050]'
                />

                <p className='font-sans font-semibold text-3xl text-[#505050]'>
                  {user?.tasksCount ?? 0}{' '}
                  {user?.tasksCount === 1 ? 'Tarefa' : 'Tarefas'}
                </p>
              </div>

              <AddButton openCreateTaskModal={openCreateTaskModal}>
                Adicionar
              </AddButton>
            </div>

            <div className='relative flex flex-col items-center justify-center w-full gap-3'>
              {user?.tasks.map((task, index) => (
                <div key={task.id} className='relative w-full'>
                  <TaskCard
                    user={user}
                    task={task}
                    index={index}
                    setUser={setUser}
                    openDetailsTaskModal={openDetailsTaskModal}
                    openUpdateTaskModal={openUpdateTaskModal}
                    openDeleteTaskModal={openDeleteTaskModal}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full w-full gap-12 p-5'>
            <img
              src='/no-tasks.svg'
              alt='Nenhuma tarefa'
              className='w-[230px] 2xl:w-[400px]'
            />

            <div className='flex flex-col items-center justify-center gap-5'>
              <div className='flex flex-col'>
                <span className='font-bold text-center text-sm sm:text-base'>
                  Ops... parece que ainda não temos nada ainda
                </span>
                <p className='text-center text-xs sm:text-sm md:text-base'>
                  Nenhuma tarefa foi encontrada, crie a sua primeira tarefa!
                </p>
              </div>

              <AddButton openCreateTaskModal={openCreateTaskModal}>
                Nova tarefa
              </AddButton>
            </div>
          </div>
        )}
      </main>

      {isCreateTaskModalOpen && (
        <CreateTaskModal
          user={user as IUserProps}
          isCreateTaskModalOpen={isCreateTaskModalOpen}
          setUser={setUser}
          closeCreateTaskModal={closeCreateTaskModal}
        />
      )}

      {isDetailsTaskModalOpen && (
        <DetailsTaskModal
          task={task as ITask}
          closeDetailsTaskModal={closeDetailsTaskModal}
        />
      )}

      {isUpdateTaskModalOpen && (
        <UpdateTaskModal
          user={user as IUserProps}
          task={task as ITask}
          taskIndex={taskIndex}
          setUser={setUser}
          isUpdateTaskModalOpen={isUpdateTaskModalOpen}
          closeUpdateTaskModal={closeUpdateTaskModal}
        />
      )}

      {isDeleteTaskModalOpen && (
        <DeleteTaskModal
          task={task as ITask}
          index={taskIndex}
          user={user as IUserProps}
          setUser={setUser}
          closeDeleteTaskModal={closeDeleteTaskModal}
        />
      )}
    </div>
  );
}
