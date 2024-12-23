import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { ITask } from '../../dto/ITask';
import { useTheme } from '../../hooks/useTheme';

interface DetailsTaskModalProps {
  task: ITask;
  isDetailsTaskModalOpen: boolean;
  closeDetailsTaskModal: () => void;
}

export function DetailsTaskModal({
  task,
  isDetailsTaskModalOpen,
  closeDetailsTaskModal,
}: DetailsTaskModalProps) {
  const { theme } = useTheme();

  const [bgColor, setBgColor] = useState('bg-black/0');
  const [scaleClass, setScaleClass] = useState('scale-0');
  const [opacityClass, setOpacityClass] = useState('opacity-0');

  function handleCloseModalWithEscKey(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    if (event.key === 'Escape') {
      closeDetailsTaskModal();
    }
  }

  function handleCloseModal() {
    setScaleClass('scale-0');
    setOpacityClass('opacity-0');

    setTimeout(() => {
      closeDetailsTaskModal();
    }, 200);
  }

  useEffect(() => {
    if (isDetailsTaskModalOpen) {
      document.body.style.overflow = 'hidden';
      setScaleClass('scale-100');
      setOpacityClass('opacity-100');
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDetailsTaskModalOpen]);

  useEffect(() => {
    if (theme === 'light') {
      setBgColor('bg-black/20');
    } else {
      setBgColor('bg-black/40');
    }

    setScaleClass('scale-100');
  }, [theme]);

  return (
    <div
      tabIndex={0}
      onKeyUp={(event) => handleCloseModalWithEscKey(event)}
      className={`${
        isDetailsTaskModalOpen === false ? 'hidden' : ''
      } w-full h-full fixed z-20 ${bgColor} ${opacityClass} transition-all duration-500 backdrop-blur-xs`}
    >
      <div
        className={`${scaleClass} transition-transform duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] modal-shadow rounded-xl rounded-b-xl overflow-hidden`}
      >
        <div
          className={`relative flex items-center justify-center w-full py-3 rounded-t-xl overflow-hidden ${
            theme === 'light' ? 'bg-[#F2F2F2]' : 'bg-[#474747]'
          }`}
        >
          <p
            className={`font-quicksand font-semibold text-center ${
              theme === 'light' ? 'text-[#505050]' : 'text-white'
            }`}
          >
            {task.title}
          </p>

          <IoMdClose
            size={20}
            onClick={handleCloseModal}
            className={`absolute right-4 cursor-pointer text-[#757575] ${
              theme === 'light' ? 'hover:text-black' : 'hover:text-white'
            } transition-colors`}
          />
        </div>

        <div
          className={`flex items-center justify-center h-full p-10 ${
            theme === 'light' ? 'bg-white' : 'bg-[#535353]'
          }`}
        >
          <p
            className={`text-center ${
              theme === 'light' ? 'text-[#707070]' : 'text-[#EAEAEA]'
            }`}
          >
            {task.description !== '' ? task.description : 'Sem descrição'}
          </p>
        </div>
      </div>
    </div>
  );
}
