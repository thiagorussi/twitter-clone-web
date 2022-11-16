import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { FaEarlybirds, FaKiwiBird } from 'react-icons/fa';
import {GiBirdMask, } from 'react-icons/gi'

const Input = props => (
  <input {...props} className='w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum' />
)

const validationSchema = yup.object({
  name: yup.string().required('Digite seu nome'),
  username: yup.string().required('Digite seu nome de usuário'),
  email: yup.string().email('Email inválido').required('Digite seu email'),
  password: yup.string().required('Digite sua senha')
})

function Signup({ signInUser }) {

  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`, {
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password

      })
      signInUser(res.data)
    },
    initialValues: {
      email: '',
      password: ''
    },
    validateOnMount: true,
    validationSchema,

  })


  return (
    <div className='h-full flex justify-center'>
      <div className='bg-birdBlue lg:flex-1 flex justify-center items-center '><FaKiwiBird className='text-9xl max-lg:hidden'/></div>
      <div className='flex-1 flex justify-center items-center p-12 space-y-6'>
        <div className='max-w-md flex-1 space-y-6'>
          <h1 className='text-3xl'>Crie sua conta</h1>

          <form className='space-y-6' onSubmit={formik.handleSubmit}>

            <div className='space-y-2'>
              <Input
                type='text'
                name='name'
                placeholder='Nome'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.email && formik.errors.name &&
                <p className='text-red-500 text-sm'>{formik.errors.name}</p>}
            </div>

            <div className='space-y-2'>
              <Input
                type='text'
                name='username'
                placeholder='Nome de usuário'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.username && formik.errors.username &&
                <p className='text-red-500 text-sm'>{formik.errors.username}</p>}
            </div>

            <div className='space-y-2'>
              <Input
                type='text'
                name='email'
                placeholder='E-mail'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.email && formik.errors.email &&
                <p className='text-red-500 text-sm'>{formik.errors.email}</p>}
            </div>

            <div className='space-y-2'>
              <Input
                type='password'
                name='password'
                placeholder='Senha'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.password && formik.errors.password &&
                <p className='text-red-500 text-sm'>{formik.errors.password}</p>}
            </div>

            <button
              type='submit'
              className='w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg'
              disabled={formik.isSubmitting || !formik.isValid}

            >
              {formik.isSubmitting ? 'Enviando...' : 'Cadastrar'}
            </button>
          </form>
          <span className='text-sm text-silver text-center'>
            Já tem uma conta? <a className='text-birdBlue' href='/login'>Acesse</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Signup