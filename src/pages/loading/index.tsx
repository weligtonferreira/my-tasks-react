export function LoadingPage() {
  return (
    <div className='flex flex-col items-center justify-center bg-light w-screnn h-screen p-4 gap-5'>
      <img src='/loading.webp' alt='Loading animation' />

      <p className='font-bold font-quicksand text-gray-700'>Loading...</p>
    </div>
  );
}
