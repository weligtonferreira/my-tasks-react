import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { FaUser } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdMail } from 'react-icons/md';
import { z } from 'zod';

import {
  notifyErrorPopUp,
  notifySuccessPopUp,
} from '../../utils/notify-popups';
import { handleNotifyValidationErrors } from '../../utils/handle-notify-validation-errors';
import { createUserSchema } from '../../schemas/userSchema';
import { api } from '../../services/api';
import { useTheme } from '../../hooks/useTheme';

type CreateUserInputData = z.infer<typeof createUserSchema>;

export function RegisterPage() {
  const { register, handleSubmit } = useForm<CreateUserInputData>();
  const [isPassword, setIsPassword] = useState(true);
  const [translateToRight, setTranslateToRight] = useState(
    'opacity-0 -translate-x-20'
  );
  const [translateToDown, setTranslateToDown] = useState(
    'opacity-0 -translate-y-20'
  );
  const navigate = useNavigate();
  const { theme } = useTheme();

  function handlePasswordInputType() {
    setIsPassword(!isPassword);
  }

  async function handleCreateAnAccount(
    createUserInputData: CreateUserInputData
  ) {
    try {
      await api.post('/users', createUserInputData);

      notifySuccessPopUp('Cadastro realizado com sucesso!');

      navigate('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.statusCode === 409) {
          notifyErrorPopUp('Usuário já cadastrado!');
        } else {
          notifyErrorPopUp('Erro ao cadastrar usuário!');
        }
      }
    }
  }

  useEffect(() => {
    setTranslateToRight('opacity-100 -translate-x-0');
    setTranslateToDown('opacity-100 -translate-y-0');
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
            className={`font-quicksand font-semibold text-5xl ${
              theme === 'light' ? '' : 'text-white'
            } transition-colors duration-300`}
          >
            My<span className='text-primary-green'>Tasks</span>
          </h1>

          <div className='flex flex-col items-center justify-center gap-4'>
            <h2
              className={`font-quicksand font-bold text-3xl ${
                theme === 'light' ? 'text-[#8D8D8D]' : 'text-white'
              } transition-colors duration-300`}
            >
              Cadastro
            </h2>

            <form
              onSubmit={handleSubmit(handleCreateAnAccount, (formErrors) =>
                handleNotifyValidationErrors(formErrors, theme)
              )}
              className='flex flex-col items-center justify-center gap-3'
            >
              <div
                className={`flex items-center justify-center rounded-lg px-4 py-2 gap-1 ${
                  theme === 'light' ? 'bg-input-color' : 'bg-dark-input-color'
                } transition-colors duration-300`}
              >
                <input
                  type='text'
                  {...register('name', {
                    required: 'O campo nome é obrigatório',
                  })}
                  autoComplete='name'
                  placeholder='Nome'
                  maxLength={50}
                  aria-label='Input de nome'
                  className={`bg-transparent outline-none ${
                    theme === 'light' ? 'text-gray-500' : 'text-dark-input-text'
                  } transition-colors duration-300`}
                />

                <FaUser
                  size={18}
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
                  type='email'
                  {...register('email', {
                    required: 'O campo email é obrigatório',
                  })}
                  autoComplete='email'
                  placeholder='Email'
                  maxLength={100}
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
                    className={`cursor-pointer ${
                      theme === 'light'
                        ? 'text-gray-700'
                        : 'text-dark-input-icons-color'
                    } transition-colors duration-300`}
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={handlePasswordInputType}
                    size={20}
                    className={`cursor-pointer ${
                      theme === 'light'
                        ? 'text-gray-700'
                        : 'text-dark-input-icons-color'
                    } transition-colors duration-300`}
                  />
                )}
              </div>

              <button
                type='submit'
                className='w-full py-2 rounded-lg font-bold text-white bg-primary-green hover:bg-secundary-green transition-colors'
              >
                Cadastro
              </button>
            </form>

            <div
              className={`flex flex-col items-center justify-center ${
                theme === 'light' ? '' : 'text-white'
              } transition-colors duration-300`}
            >
              <p className='font-light'>Já possui uma conta?</p>
              <p className='font-light'>
                Entre com sua conta{' '}
                <a
                  href='/login'
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
