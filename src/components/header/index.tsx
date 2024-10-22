import { useState } from 'react';
import { FaAngleDown, FaUser } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  return (
    <header className='flex items-center justify-between px-6 sm:px-20 py-6'>
      <h1
        className={`font-quicksand font-semibold text-3xl select-none ${
          theme === 'light' ? '' : 'text-white'
        } transition-colors duration-300 hover:animate-pulse`}
      >
        My<span className='text-primary-green'>Tasks</span>
      </h1>

      <div
        onMouseOver={() => setIsUserMenuVisible(true)}
        onMouseOut={() => setIsUserMenuVisible(false)}
        className={`relative flex flex-col items-center justify-center rounded-full p-2 ${
          theme === 'light' ? 'bg-gray-100' : 'bg-[#515151]'
        } transition-bg-transform duration-bg-transform hover:rounded-xl hover:rounded-b-none hover:drop-shadow`}
      >
        <div className='flex items-center justify-center gap-1'>
          <FaAngleDown
            size={15}
            className={`${isUserMenuVisible ? 'rotate-180' : ''} ${
              theme === 'light' ? 'text-[#363636]' : 'text-white'
            } transition-color-transform duration-color-transform`}
          />

          <p
            className={`font-sans font-light cursor-default ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            } text-sm sm:text-base transition-colors duration-300`}
          >
            {user?.name}
          </p>

          <div className='flex items-center justify-center p-1 rounded-full'>
            <FaUser
              size={16}
              className={`${
                theme === 'light' ? '' : 'text-white'
              } transition-colors duration-200`}
            />
          </div>
        </div>

        {isUserMenuVisible && (
          <div
            className={`${
              isUserMenuVisible ? 'h-max opacity-100' : 'h-0 opacity-60'
            } absolute top-[2.5rem] w-full ${
              theme === 'light' ? 'bg-gray-100' : 'bg-[#515151]'
            } p-1 rounded-b-lg overflow-hidden transition-all duration-1000`}
          >
            <ul className='flex flex-col items-center justify-center w-[inherit] select-none p-1 gap-1'>
              <hr
                className={`p-1 w-full ${
                  theme === 'light' ? '' : 'border-[#373737]'
                }`}
              />

              <li
                onClick={logout}
                className={`text-sm text-center hover:font-semibold ${
                  theme === 'light'
                    ? 'text-gray-600 hover:text-white bg-gray-200 hover:bg-black'
                    : 'text-white hover:text-black bg-black hover:bg-gray-100'
                } px-4 py-2 rounded-md w-full transition-all duration-300 cursor-pointer`}
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
