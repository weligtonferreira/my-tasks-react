import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdMail } from 'react-icons/md';

export function RegisterPage() {
  const [isPassword, setIsPassword] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlePasswordInputType() {
    setIsPassword(!isPassword);
  }

  return (
    <div className='flex items-center justify-center h-screen w-full bg-[#fdfdfd]'>
      <div className='flex items-center justify-around h-full w-full'>
        <div className='flex items-center justify-center py-4'>
          <img
            src='/complete_task.svg'
            alt='Imagem de tarefas concluídas'
            height={400}
            width={400}
          />
        </div>

        <div className='flex flex-col items-center justify-center h-full bg-primary-gray space-y-12'>
          <h1 className='font-quicksand font-semibold text-5xl'>
            My<span className='text-primary-green'>Tasks</span>
          </h1>

          <div className='flex flex-col items-center justify-center gap-4'>
            <h2 className='font-quicksand font-bold text-3xl text-[#8D8D8D]'>
              Cadastro
            </h2>

            <form
              action=''
              className='flex flex-col items-center justify-center gap-3'
            >
              <div className='flex items-center justify-center bg-input-color rounded-lg px-4 py-2 gap-1'>
                <input
                  type='text'
                  name='name'
                  autoComplete='name'
                  placeholder='Nome completo'
                  aria-label='Input de nome completo'
                  onChange={(event) => setName(event.target.value)}
                  className='bg-transparent outline-none text-gray-500'
                />

                <FaUser size={18} className='text-gray-700' />
              </div>

              <div className='flex items-center justify-center bg-input-color rounded-lg px-4 py-2 gap-1'>
                <input
                  type='email'
                  name='email'
                  autoComplete='email'
                  placeholder='Email'
                  aria-label='Input de email'
                  onChange={(event) => setEmail(event.target.value)}
                  className='bg-transparent outline-none text-gray-500'
                />

                <MdMail size={20} className='text-gray-700' />
              </div>

              <div className='flex items-center justify-center bg-input-color rounded-lg px-4 py-2 gap-1'>
                <input
                  type={isPassword ? 'password' : 'text'}
                  name='password'
                  placeholder='Senha'
                  aria-label='Input de senha'
                  onBlur={() => setIsPassword(true)}
                  onChange={(event) => setPassword(event.target.value)}
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
                type='button'
                className='w-full py-2 rounded-lg font-bold text-white bg-primary-green hover:bg-[#259629] transition-colors'
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
        </div>
      </div>
    </div>
  );
}
