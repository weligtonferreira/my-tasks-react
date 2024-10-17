import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdMail } from 'react-icons/md';
import { AxiosError } from 'axios';
import { z } from 'zod';

import {
  notifyErrorPopUp,
  notifySuccessPopUp,
} from '../../utils/notify-popups';
import { userLoginInputSchema } from '../../schemas/userSchema';
import { handleNotifyValidationErrors } from '../../utils/handle-notify-validation-errors';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { api } from '../../services/api';

type UserLoginInputSchema = z.infer<typeof userLoginInputSchema>;

export function LoginPage() {
  const { register, handleSubmit } = useForm<UserLoginInputSchema>();
  const [isPassword, setIsPassword] = useState(true);
  const [translateToRight, setTranslateToRight] = useState(
    'opacity-0 -translate-x-20'
  );
  const [translateToDown, setTranslateToDown] = useState(
    'opacity-0 -translate-y-20'
  );
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();

  function handlePasswordInputType() {
    setIsPassword(!isPassword);
  }

  async function handleLogin(userLoginInputSchema: UserLoginInputSchema) {
    try {
      const userToken = await api
        .post('/users/login', userLoginInputSchema)
        .then((res) => res.data);

      login(userToken);

      notifySuccessPopUp('Login realizado com sucesso!', theme);

      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.statusCode === 400) {
          notifyErrorPopUp('Email ou senha inválidos!', theme);
        } else {
          notifyErrorPopUp('Erro ao fazer login do usuário!', theme);
        }
      }
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTranslateToRight('opacity-100 -translate-x-0');
      setTranslateToDown('opacity-100 -translate-y-0');
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-center h-screen w-full ${
        theme === 'light' ? 'bg-light' : 'bg-dark'
      } transition-colors duration-300`}
    >
      <div className='flex items-center justify-around h-full w-full'>
        <div
          className={`${translateToRight} hidden md:flex items-center justify-center py-4 transition-bg-transform-opacity duration-bg-transform-opacity`}
        >
          <img
            src='/complete_task.svg'
            alt='Imagem de tarefas concluídas'
            height={400}
            width={400}
          />
        </div>

        <section
          className={`${translateToDown} flex flex-col items-center justify-center h-full px-4 space-y-12 transition-bg-transform-opacity duration-bg-transform-opacity`}
        >
          <h1
            className={`${
              theme === 'light' ? '' : 'text-white'
            } font-quicksand font-semibold text-5xl transition-colors duration-300`}
          >
            My<span className='text-primary-green'>Tasks</span>
          </h1>

          <div className='flex flex-col items-center justify-center gap-4'>
            <h2
              className={`${
                theme === 'light' ? 'text-[#8D8D8D]' : 'text-white'
              } font-quicksand font-bold text-3xl transition-colors duration-300`}
            >
              Login
            </h2>

            <form
              onSubmit={handleSubmit(handleLogin, (formErrors) => {
                handleNotifyValidationErrors(formErrors, theme);
              })}
              className='flex flex-col items-center justify-center gap-3'
            >
              <div
                className={`flex items-center justify-center rounded-lg px-4 py-2 gap-1 ${
                  theme === 'light' ? 'bg-input-color' : 'bg-dark-input-color'
                } transition-colors duration-300`}
              >
                <input
                  type='email'
                  {...register('email', {
                    required: 'O campo email é obrigatório',
                  })}
                  autoComplete='email'
                  placeholder='Email'
                  aria-label='Input de email'
                  className={`bg-transparent outline-none ${
                    theme === 'light' ? 'text-gray-500' : 'text-dark-input-text'
                  } transition-colors duration-300`}
                />

                <MdMail
                  size={20}
                  className={`${
                    theme === 'light'
                      ? 'text-gray-700'
                      : 'text-dark-input-icons-color'
                  } transition-colors duration-300`}
                />
              </div>

              <div
                className={`flex items-center justify-center rounded-lg px-4 py-2 gap-1 ${
                  theme === 'light' ? 'bg-input-color' : 'bg-dark-input-color'
                } transition-colors duration-300`}
              >
                <input
                  type={isPassword ? 'password' : 'text'}
                  {...register('password', {
                    required: 'O campo senha é obrigatório',
                    minLength: {
                      value: 8,
                      message: 'A senha deve ter ao menos oito caracteres',
                    },
                  })}
                  placeholder='Senha'
                  aria-label='Input de senha'
                  onBlur={() => setIsPassword(true)}
                  className={`bg-transparent outline-none ${
                    theme === 'light' ? 'text-gray-500' : 'text-dark-input-text'
                  } transition-colors duration-300`}
                />

                {isPassword ? (
                  <IoMdEye
                    onClick={handlePasswordInputType}
                    size={20}
                    className={`${
                      theme === 'light'
                        ? 'text-gray-700'
                        : 'text-dark-input-icons-color'
                    } transition-colors duration-300 cursor-pointer`}
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={handlePasswordInputType}
                    size={20}
                    className={`${
                      theme === 'light'
                        ? 'text-gray-700'
                        : 'text-dark-input-icons-color'
                    } transition-colors duration-300 cursor-pointer`}
                  />
                )}
              </div>

              <button
                type='submit'
                className='w-full py-2 rounded-lg font-bold text-white bg-primary-green hover:bg-[#259629] transition-colors'
              >
                Entrar
              </button>
            </form>

            <div
              className={`flex flex-col items-center justify-center ${
                theme === 'light' ? '' : 'text-white'
              } transition-colors duration-300`}
            >
              <p className='font-light'>Não possui sua conta ainda?</p>
              <p className='font-light'>
                Cadastre-se{' '}
                <a
                  href='/register'
                  className='font-semibold text-primary-green hover:text-secundary-green transition-colors duration-200'
                >
                  aqui
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
