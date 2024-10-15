import { useTheme } from '../../hooks/useTheme';

export function LoadingPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center w-screnn h-screen p-4 gap-5 ${
        theme === 'light' ? 'bg-white' : 'bg-dark'
      }`}
    >
      <img src='/loading.webp' alt='Loading animation' />

      <p className='font-bold font-quicksand text-gray-700'>Loading...</p>
    </div>
  );
}
