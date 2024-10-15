import { MdOutlineWbSunny } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';
import { FaMoon } from 'react-icons/fa';

export function ToggleColorThemeButton() {
  const { theme, toggleThemeColor } = useTheme();

  return (
    <div
      onClick={toggleThemeColor}
      className={`fixed z-20 bottom-12 right-14 shadow ${
        theme === 'light' ? 'bg-[#ECECEC]' : 'bg-[#5B5B5B]'
      } flex items-center justify-center gap-3 rounded-full p-2 transition-colors duration-300 cursor-pointer`}
    >
      <MdOutlineWbSunny
        size={25}
        className={`${
          theme === 'light' ? 'text-yellow-500' : 'text-slate-400'
        } cursor-pointer transition-colors duration-300`}
      />

      <FaMoon
        size={21}
        className={`${
          theme === 'light' ? 'text-gray-400' : 'text-[#9CC5FF]'
        } cursor-pointer transition-all duration-300`}
      />
    </div>
  );
}
