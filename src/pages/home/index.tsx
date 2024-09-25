import { FiCheckCircle } from 'react-icons/fi';

import { Header } from '../../components/header';
import { TaskCard } from '../../components/task-card';
import { AddButton } from '../../components/add-button';

import { useFetchUserData } from '../../hooks/useFetchUserData';

export function HomePage() {
  const { user, setUser } = useFetchUserData();

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

              <AddButton>Adicionar</AddButton>
            </div>

            <div className='flex flex-col items-center justify-center w-full gap-3'>
              {user?.tasks.map((task, index) => (
                <TaskCard
                  user={user}
                  task={task}
                  index={index}
                  setUser={setUser}
                />
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

              <AddButton>Nova tarefa</AddButton>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
