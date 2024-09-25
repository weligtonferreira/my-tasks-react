import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { ITask } from '../../dto/ITask';

interface DetailsTaskModalProps {
  task: ITask;
  closeDetailsTaskModal: () => void;
}

export function DetailsTaskModal({
  task,
  closeDetailsTaskModal,
}: DetailsTaskModalProps) {
  const [bgColor, setBgColor] = useState('bg-black/0');
  const [scaleClass, setScaleClass] = useState('scale-0');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBgColor('bg-black/20');
      setScaleClass('scale-100');
    }, 0);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <div
      className={`w-full h-full absolute z-20 ${bgColor} transition-['background-color'] duration-500`}
    >
      <div
        className={`${scaleClass} transition-transform duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] modal-shadow rounded-xl rounded-b-xl overflow-hidden`}
      >
        <div className='relative flex items-center justify-center w-full py-3 bg-[#FAFAFA] border-b rounded-t-xl overflow-hidden'>
          <p className='font-quicksand font-semibold text-center text-[#505050]'>
            {task.title}
          </p>

          <IoMdClose
            size={20}
            onClick={closeDetailsTaskModal}
            className='absolute right-4 cursor-pointer text-[#757575] hover:text-black transition-colors'
          />
        </div>

        <div className='flex items-center justify-center bg-white h-full p-10'>
          <p className='text-[#707070] text-center'>
            {task.description !== '' ? task.description : 'Sem descrição'}
          </p>
        </div>
      </div>
    </div>
  );
}
