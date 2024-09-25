import { Header } from '../../components/header';
import { AddButton } from '../../components/add-button';

export function HomePage() {
  return (
    <div className='flex flex-col h-full w-full bg-light'>
      <Header />

      <main className='flex flex-col items-center justify-start h-full w-full p-5'>
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
      </main>
    </div>
  );
}
