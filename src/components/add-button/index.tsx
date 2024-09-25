import { ReactNode } from 'react';
import { GoPlus } from 'react-icons/go';

interface AddButtonProps {
  children: ReactNode;
  openCreateTaskModal: () => void;
}

export function AddButton({ children, openCreateTaskModal }: AddButtonProps) {
  return (
    <div
      onClick={openCreateTaskModal}
      className='flex items-center justify-center max-w-max rounded-md bg-[#1AC014] text-center text-white px-3 py-2 hover:brightness-105 transition-colors hover:cursor-pointer select-none shadow'
    >
      <GoPlus size={20} />
      <button className='font-semibold font-quicksand pr-1 outline-none border-none'>
        {children}
      </button>
    </div>
  );
}
