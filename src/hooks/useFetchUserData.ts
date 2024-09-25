import { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';

import { useAuth } from './useAuth';
import { IUserProps } from '../dto/IUserProps';
import { ITask } from '../dto/ITask';
import { api } from '../services/api';

interface FetchUserErrorResponse {
  message: string;
  statusCode: number;
}

export const useFetchUserData = () => {
  const [user, setUser] = useState<IUserProps>();
  const { user: authUser, logout } = useAuth();
  const previousTaskRef = useRef<ITask[]>();

  const fetchUserData = useCallback(async () => {
    try {
      const { data: userData } = await api.get<IUserProps>(
        `/users/${authUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        }
      );

      setUser(userData);
    } catch (err) {
      const error = err as AxiosError<FetchUserErrorResponse>;

      if (error.response?.data.statusCode === 404) {
        logout();
      }
    }
  }, [authUser?.userId, authUser?.token, logout]);

  useEffect(() => {
    if (authUser?.userId) {
      fetchUserData();
    }
  }, [authUser?.userId, fetchUserData]);

  useEffect(() => {
    const previousTasks = previousTaskRef.current;
    const currentTasks = user?.tasks;

    const tasksHaveChanged =
      !previousTasks ||
      previousTasks.length !== currentTasks?.length ||
      currentTasks?.some(
        (task, index) => task.updatedAt !== previousTasks?.[index]?.updatedAt
      );

    if (tasksHaveChanged) {
      fetchUserData();
    }

    previousTaskRef.current = currentTasks;
  }, [user?.tasks, fetchUserData]);

  return { user, setUser };
};
