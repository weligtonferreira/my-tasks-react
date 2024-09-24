import { FaAngleDown, FaUser } from 'react-icons/fa';

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className='flex items-center justify-between px-20 py-6'>
      <h1 className='font-quicksand font-semibold text-3xl select-none'>
        My<span className='text-primary-green'>Tasks</span>
      </h1>

      <div className='flex flex-col items-center justify-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-colors hover:cursor-pointer'>
        <div className='flex items-center justify-center gap-1'>
          <FaAngleDown size={15} />

          <p className='font-sans font-light text-gray-800 text-sm sm:text-base'>
            {userName}
          </p>

          <div className='flex items-center justify-center p-1 rounded-full'>
            <FaUser size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
