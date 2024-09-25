import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { GiCircle } from 'react-icons/gi';
import { FaAngleDown } from 'react-icons/fa';

import { TaskMenuOptions } from '../task-menu-options';
import { ITask } from '../../dto/ITask';
import { IUserProps } from '../../dto/IUserProps';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

import './styles.css';

interface TaskCardProps {
  task: ITask;
  user: IUserProps;
  index: number;
  setUser: (user: IUserProps) => void;
  openDetailsTaskModal: (task: ITask) => void;
  openUpdateTaskModal: (task: ITask, index: number) => void;
}

export function TaskCard({
  task,
  user,
  index,
  setUser,
  openDetailsTaskModal,
  openUpdateTaskModal,
}: TaskCardProps) {
  const [isTaskMenuVisible, setIsTaskMenuVisible] = useState(false);
  const { id, title, description, isCompleted } = task;
  const { user: authUser } = useAuth();

  async function handleChangeTaskStatus() {
    await api.patch(
      `/tasks/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      }
    );

    const updatedTasks = [...user.tasks];
    updatedTasks[index].isCompleted = !isCompleted;

    const updatedUser = { ...user, tasks: updatedTasks };

    setUser(updatedUser);
  }

  return (
    <>
      <div
        className={`flex items-center justify-between w-full p-3 gap-4 rounded-lg card-shadow ${
          isCompleted ? 'bg-[#f3f3f3] hover:bg-[#f1f1f1]' : 'hover:bg-[#f8f8f8]'
        }  transition-colors`}
      >
        <div className='flex items-center gap-2 overflow-hidden'>
          {isCompleted ? (
            <FiCheckCircle
              size={15}
              strokeWidth={3}
              onClick={handleChangeTaskStatus}
              className='font-bold text-[#505050] cursor-pointer'
            />
          ) : (
            <GiCircle
              size={15}
              strokeWidth={5}
              onClick={handleChangeTaskStatus}
              className='text-[#BCBCBC] cursor-pointer'
            />
          )}

          <p
            className={`font-semibold ${
              isCompleted ? 'line-through' : ''
            } text-[#6F6F6F] whitespace-nowrap overflow-hidden overflow-ellipsis`}
          >
            {title}
          </p>
        </div>

        <div className='flex justify-end sm:w-full max-w-64 gap-4 overflow-hidden'>
          <p
            className={`text-xs text-[#6F6F6F] hidden sm:block ${
              isCompleted ? 'line-through' : ''
            } whitespace-nowrap overflow-hidden overflow-ellipsis`}
          >
            {description}
          </p>

          <FaAngleDown
            onClick={() =>
              isTaskMenuVisible === false
                ? setIsTaskMenuVisible(true)
                : setIsTaskMenuVisible(false)
            }
            size={16}
            className={`${
              isTaskMenuVisible ? 'rotate-180 ' : ''
            } shrink-0 text-[#6F6F6F] hover:text-[#363636] transition-all duration-200 cursor-pointer`}
          />
        </div>
      </div>

      <TaskMenuOptions
        task={task}
        index={index}
        isTaskMenuVisible={isTaskMenuVisible}
        setIsTaskMenuVisible={setIsTaskMenuVisible}
        openDetailsTaskModal={openDetailsTaskModal}
        openUpdateTaskModal={openUpdateTaskModal}
      />
    </>
  );
}
