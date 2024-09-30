import { useState } from 'react';
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

type CreateUserInputData = z.infer<typeof createUserSchema>;

export function RegisterPage() {
  const { register, handleSubmit } = useForm<CreateUserInputData>();
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();

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
              Cadastro
            </h2>

            <form
              onSubmit={handleSubmit(handleCreateAnAccount, (formErrors) =>
                handleNotifyValidationErrors(formErrors)
              )}
              className='flex flex-col items-center justify-center gap-3'
            >
              <div className='flex items-center justify-center bg-input-color rounded-lg px-4 py-2 gap-1'>
                <input
                  type='text'
                  {...register('name', {
                    required: 'O campo nome é obrigatório',
                  })}
                  autoComplete='name'
                  placeholder='Nome'
                  maxLength={50}
                  aria-label='Input de nome'
                  className='bg-transparent outline-none text-gray-500'
                />

                <FaUser size={18} className='text-gray-700' />
              </div>

              <div className='flex items-center justify-center bg-input-color rounded-lg px-4 py-2 gap-1'>
                <input
                  type='email'
                  {...register('email', {
                    required: 'O campo email é obrigatório',
                  })}
                  autoComplete='email'
                  placeholder='Email'
                  maxLength={100}
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
                className='w-full py-2 rounded-lg font-bold text-white bg-primary-green hover:bg-secundary-green transition-colors'
              >
                Cadastro
              </button>
            </form>

            <div className='flex flex-col items-center justify-center'>
              <p className='font-light'>Já possui uma conta?</p>
              <p className='font-light'>
                Entre com sua conta{' '}
                <a href='/login' className='text-primary-green'>
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
