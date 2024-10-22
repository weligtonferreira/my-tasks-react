import { useEffect, useState } from 'react';
import { MdOutlineWbSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';

import { useTheme } from '../../hooks/useTheme';

export function ToggleColorThemeButton() {
  const { theme, toggleThemeColor } = useTheme();
  const [growUpScale, setGrowUpScale] = useState('opacity-0 scale-50');
  const [durationBgTransformOpacity, setDurationBgTransformOpacity] = useState(
    'duration-bg-transform-opacity'
  );

  useEffect(() => {
    setGrowUpScale('opacity-100 scale-100');

    const timeout = setTimeout(() => {
      setDurationBgTransformOpacity('duration-bg-transform-opacity-second');
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      onClick={toggleThemeColor}
      className={`${growUpScale} fixed z-20 bottom-12 right-14 shadow ${
        theme === 'light' ? 'bg-[#ECECEC]' : 'bg-[#5B5B5B]'
      } flex items-center justify-center gap-3 rounded-full p-2 hover:scale-110 hover:brightness-95 transition-bg-transform-opacity ${durationBgTransformOpacity} cursor-pointer`}
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
