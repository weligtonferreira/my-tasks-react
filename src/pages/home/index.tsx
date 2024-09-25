import { Header } from '../../components/header';

export function HomePage() {
  return (
    <div className='flex flex-col h-full w-full bg-light'>
      <Header />

      <main className='flex flex-col items-center justify-start h-full w-full p-5'>
        <h1>Home Page</h1>
      </main>
    </div>
  );
}
