import { useState } from 'react';
import { FaAngleDown, FaUser } from 'react-icons/fa';

import { useAuth } from '../../hooks/useAuth';
import { IoLogOutOutline } from 'react-icons/io5';

export function Header() {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className='flex items-center justify-between px-6 sm:px-20 py-6'>
      <h1 className='font-quicksand font-semibold text-3xl select-none'>
        My<span className='text-primary-green'>Tasks</span>
      </h1>

      <div
        onMouseOver={() => setIsUserMenuVisible(true)}
        onMouseOut={() => setIsUserMenuVisible(false)}
        className='relative flex flex-col items-center justify-center rounded-full p-2 bg-gray-100 hover:bg-light transition-colors hover:cursor-pointer hover:rounded-xl hover:rounded-b-none hover:drop-shadow'
      >
        <div className='flex items-center justify-center gap-1'>
          <FaAngleDown
            size={15}
            className={`${
              isUserMenuVisible ? 'rotate-180' : ''
            } text-[#363636] transition-all duration-200`}
          />

          <p className='font-sans font-light text-gray-800 text-sm sm:text-base'>
            {user?.name}
          </p>

          <div className='flex items-center justify-center p-1 rounded-full'>
            <FaUser size={16} />
          </div>
        </div>

        {isUserMenuVisible && (
          <div
            className={`${
              isUserMenuVisible ? 'h-max opacity-100' : 'h-0 opacity-60'
            } absolute top-[2.5rem] w-full bg-light p-1 rounded-b-lg overflow-hidden transition-all ease-in duration-200`}
          >
            <ul className='flex flex-col items-center justify-center w-[inherit] select-none p-1 gap-1'>
              <hr className='p-1 w-full' />

              <li
                onClick={logout}
                className='text-sm text-center hover:font-semibold text-gray-600 hover:text-white bg-gray-100 hover:bg-black px-4 py-2 rounded-md w-full transition-colors'
              >
                <p className='flex items-center justify-center gap-1'>
                  Sair{' '}
                  <span>
                    <IoLogOutOutline size={15} />
                  </span>
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
