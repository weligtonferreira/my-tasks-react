import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdMail } from 'react-icons/md';
import { AxiosError } from 'axios';
import { z } from 'zod';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import {
  notifyErrorPopUp,
  notifySuccessPopUp,
} from '../../utils/notify-popups';
import { userLoginInputSchema } from '../../schemas/userSchema';
import { handleNotifyValidationErrors } from '../../utils/handle-notify-validation-errors';

type UserLoginInputSchema = z.infer<typeof userLoginInputSchema>;

export function LoginPage() {
  const { register, handleSubmit } = useForm<UserLoginInputSchema>();
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  function handlePasswordInputType() {
    setIsPassword(!isPassword);
  }

  async function handleLogin(userLoginInputSchema: UserLoginInputSchema) {
    try {
      const userToken = await api
        .post('/users/login', userLoginInputSchema)
        .then((res) => res.data);

      login(userToken);

      notifySuccessPopUp('Login realizado com sucesso!');

      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.statusCode === 400) {
          notifyErrorPopUp('Email ou senha inválidos!');
        } else {
          notifyErrorPopUp('Erro ao fazer login do usuário!');
        }
      }
    }
  }

  return (
    <div className='flex items-center justify-center h-screen w-full bg-light'>
      <div className='flex items-center justify-around h-full w-full'>
        <div className='hidden md:flex items-center justify-center py-4'>
          <img
            src='/complete_task.svg'
            alt='Imagem de tarefas concluídas'
            height={400}
            width={400}
          />
        </div>

        <section className='flex flex-col items-center justify-center h-full bg-primary-gray px-4 space-y-12'>
          <h1 className='font-quicksand font-semibold text-5xl'>
            My<span className='text-primary-green'>Tasks</span>
          </h1>

          <div className='flex flex-col items-center justify-center gap-4'>
            <h2 className='font-quicksand font-bold text-3xl text-[#8D8D8D]'>
              Login
            </h2>

            <form
              onSubmit={handleSubmit(handleLogin, (formErrors) => {
                handleNotifyValidationErrors(formErrors);
              })}
              className='flex flex-col items-center justify-center gap-3'
            >
              <div className='flex items-center justify-center bg-input-color rounded-lg px-4 py-2 gap-1'>
                <input
                  type='email'
                  {...register('email', {
                    required: 'O campo email é obrigatório',
                  })}
                  autoComplete='email'
                  placeholder='Email'
                  aria-label='Input de email'
                  className='bg-transparent outline-none text-gray-500'
                />

                <MdMail size={20} className='text-gray-700' />
              </div>

              <div className='flex items-center justify-center bg-input-color rounded-lg px-4 py-2 gap-1'>
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
                  className='bg-transparent outline-none text-gray-500'
                />

                {isPassword ? (
                  <IoMdEye
                    onClick={handlePasswordInputType}
                    size={20}
                    className='text-gray-700 cursor-pointer'
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={handlePasswordInputType}
                    size={20}
                    className='text-gray-700 cursor-pointer'
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

            <div className='flex flex-col items-center justify-center'>
              <p className='font-light'>Não possui sua conta ainda?</p>
              <p className='font-light'>
                Cadastre-se{' '}
                <a href='/register' className='text-primary-green'>
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
