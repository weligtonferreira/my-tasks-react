import { useEffect, useState } from 'react';
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
import { useTheme } from '../../hooks/useTheme';

interface HomePageProps {
  component: React.ReactNode;
}

export function HomePage({ component: ToggleColorThemeButton }: HomePageProps) {
  const { user, setUser } = useFetchUserData();
  const { theme } = useTheme();

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isDetailsTaskModalOpen, setIsDetailsTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [task, setTask] = useState<Partial<ITask>>({
    title: '',
    description: '',
  });
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const [translateUp, setTranslateUp] = useState('opacity-0 pt-20');

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

  useEffect(() => {
    setTranslateUp('opacity-100 pt-5');
  }, []);

  return (
    <>
      <div
        className={`flex flex-col min-h-full ${
          theme === 'light' ? 'bg-light' : 'bg-dark'
        } transition-colors duration-300`}
      >
        <Header />

        <main
          className={`${translateUp} flex flex-col items-center justify-start h-full w-full p-5 transition-all duration-[1500ms]`}
        >
          {user?.tasksCount ?? 0 > 0 ? (
            <div className='flex flex-col items-center justify-center w-full sm:max-w-[70vw] gap-8 p-5'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-1'>
                  <FiCheckCircle
                    size={25}
                    strokeWidth={3}
                    className={`font-bold ${
                      theme === 'light' ? 'text-[#505050]' : 'text-white'
                    } transition-colors duration-300`}
                  />

                  <p
                    className={`font-sans font-semibold text-3xl ${
                      theme === 'light' ? 'text-[#505050]' : 'text-white'
                    } transition-colors duration-300`}
                  >
                    {user?.tasksCount ?? 0}{' '}
                    {user?.tasksCount === 1 ? 'Tarefa' : 'Tarefas'}
                  </p>
                </div>

                <AddButton openCreateTaskModal={openCreateTaskModal}>
                  Adicionar
                </AddButton>
              </div>

              <div className='relative flex flex-col items-center justify-center w-full gap-3 mb-16'>
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
                <div
                  className={`flex flex-col ${
                    theme === 'light' ? '' : 'text-white'
                  } transition-colors duration-300`}
                >
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

        <CreateTaskModal
          user={user as IUserProps}
          isCreateTaskModalOpen={isCreateTaskModalOpen}
          setUser={setUser}
          closeCreateTaskModal={closeCreateTaskModal}
        />

        <DetailsTaskModal
          task={task as ITask}
          isDetailsTaskModalOpen={isDetailsTaskModalOpen}
          closeDetailsTaskModal={closeDetailsTaskModal}
        />

        <UpdateTaskModal
          user={user as IUserProps}
          task={task as ITask}
          taskIndex={taskIndex}
          setUser={setUser}
          isUpdateTaskModalOpen={isUpdateTaskModalOpen}
          closeUpdateTaskModal={closeUpdateTaskModal}
        />

        <DeleteTaskModal
          task={task as ITask}
          index={taskIndex}
          user={user as IUserProps}
          isDeleteTaskModalOpen={isDeleteTaskModalOpen}
          setUser={setUser}
          closeDeleteTaskModal={closeDeleteTaskModal}
        />
      </div>

      {ToggleColorThemeButton}
    </>
  );
}
