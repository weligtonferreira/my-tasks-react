import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineCircle } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa';

import { TaskMenuOptions } from '../task-menu-options';
import { ITask } from '../../dto/ITask';
import { IUserProps } from '../../dto/IUserProps';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { api } from '../../services/api';

import './styles.css';

interface TaskCardProps {
  task: ITask;
  user: IUserProps;
  index: number;
  setUser: (user: IUserProps) => void;
  openDetailsTaskModal: (task: ITask) => void;
  openUpdateTaskModal: (task: ITask, index: number) => void;
  openDeleteTaskModal: (task: ITask, index: number) => void;
}

export function TaskCard({
  task,
  user,
  index,
  setUser,
  openDetailsTaskModal,
  openUpdateTaskModal,
  openDeleteTaskModal,
}: TaskCardProps) {
  const [isTaskMenuVisible, setIsTaskMenuVisible] = useState(false);
  const { id, title, description, isCompleted } = task;
  const { user: authUser } = useAuth();
  const { theme } = useTheme();

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
        className={`flex items-center justify-between w-full p-3 gap-4 rounded-lg ${
          theme === 'light' ? 'light-task-shadow' : 'dark-task-shadow'
        } ${
          isCompleted
            ? theme === 'light'
              ? 'bg-[#f3f3f3] hover:bg-[#f1f1f1]'
              : 'bg-dark-complete-task-color hover:brightness-105'
            : theme === 'light'
            ? 'bg-light hover:bg-[#f8f8f8]'
            : 'bg-dark-task-color hover:brightness-105'
        } transition-all duration-300`}
      >
        <div className='flex items-center gap-2 overflow-hidden'>
          {isCompleted ? (
            <FiCheckCircle
              size={15}
              strokeWidth={3}
              onClick={handleChangeTaskStatus}
              className={`font-bold ${
                theme === 'light' ? 'text-[#505050]' : 'text-[#D4D4D4]'
              } cursor-pointer transition-colors duration-300`}
            />
          ) : (
            <MdOutlineCircle
              size={15}
              onClick={handleChangeTaskStatus}
              className={`cursor-pointer ${
                theme === 'light' ? 'text-[#BCBCBC]' : 'text-white'
              } transition-colors duration-300`}
            />
          )}

          <p
            className={`font-semibold cursor-default ${
              isCompleted
                ? theme === 'light'
                  ? 'line-through text-[#6F6F6F]'
                  : 'line-through text-[#D4D4D4]'
                : theme === 'light'
                ? 'text-[#6F6F6F]'
                : 'text-white'
            } whitespace-nowrap overflow-hidden overflow-ellipsis transition-colors duration-300`}
          >
            {title}
          </p>
        </div>

        <div className='flex justify-end sm:w-full max-w-64 gap-4 overflow-hidden'>
          <p
            className={`text-xs hidden sm:block cursor-default ${
              isCompleted
                ? theme === 'light'
                  ? 'line-through text-[#6F6F6F]'
                  : 'line-through text-[#D4D4D4]'
                : theme === 'light'
                ? 'text-[#6F6F6F]'
                : 'text-[#EAEAEA]'
            } whitespace-nowrap overflow-hidden overflow-ellipsis transition-colors duration-300`}
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
            className={`${isTaskMenuVisible ? 'rotate-180 ' : ''} shrink-0 ${
              theme === 'light'
                ? 'text-[#6F6F6F] hover:text-[#363636]'
                : 'text-[#A2A2A2] hover:text-[#888888]'
            } transition-all duration-200 cursor-pointer`}
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
        openDeleteTaskModal={openDeleteTaskModal}
      />
    </>
  );
}
