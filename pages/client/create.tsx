import React, { useState } from "react";
import { useRouter } from "next/router";
import MainLayout from '../../components/layout/MainLayout';
import FeedbackModal from '../../components/modal/FeedbackModal';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

type FormValues = {
  name: string,
  document: string,
  birthday: string,
  phone: string
}

export default function ClientForm() {
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: {errors} 
  } = useForm<FormValues>();

  const onSubmit = async (data) => {
    // console.log({data})
    const resp = await fetch(`${process.env.api_base_url}/client`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "name": data.name,
        "document": data.document.replace(/\D/g, ''),
        "birthday": "1986-01-12",
        "phone": data.phone.replace(/\D/g, ''),
      }),
    })

    console.log({resp});

    const resData = await resp.json();

    console.log({resData})

    if (resp.ok) {
      setModalData({
        type: 'success',
        title: 'Sucesso',
        text: 'Cliente cadastrado com sucesso',
        onClose: () => router.push('/client'),
      })
      setShowModal(true)
    }
    else {
      let errorMessage = resData.message;
      errorMessage += `. ${resData.errors[Object.keys(resData.errors)[0]][0]}`;
      setModalData({
        type: 'danger',
        title: 'Erro',
        text: errorMessage,
        onClose: () => {return},
      })
      setShowModal(true)
    }

  }
  return (
    <MainLayout>
      {showModal && (
        <FeedbackModal
          type={modalData.type}
          title={modalData.title}
          text={modalData.text}
          onClose={modalData.onClose}
          open={showModal}
          setOpen={setShowModal}
        />
      )}
      <div className="mt-10 sm:mt-0">  
      <nav className="bg-grey-light rounded font-sans w-full my-5">
        <ol className="list-reset flex text-grey-dark">
          <li><a onClick={() => router.push('/client')} className="text-blue font-bold">Clientes</a></li>
          <li><span className="mx-2">/</span></li>
          <li>Adicionar Cliente</li>
        </ol>
      </nav>
          <div className="mt-5 md:mt-0 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="md:grid md:grid-cols-4 md:gap-12">
                    <div className="col-span-12 sm:mb-5 mb-0">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome *
                      </label>
                      <input
                        type="text"
                        {...register('name', {required: "Nome é obrigatório"})}
                        id="name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.name && <p>{errors.name?.message}</p>}
                    </div>

                    <div className="col-span-12 sm:mb-0 mb-5">
                      <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                        CPF *
                      </label>
                      <Controller
                        render={({field}) => (
                          <InputMask 
                            mask="999.999.999-99"
                            {...field}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          )}
                        // {...register('document', {required: true, minLength: 12})}
                        {...register('document', {required: true})}
                        name="document"
                        control={control}
                        defaultValue=""
                      />
                      {errors.document && <p>{errors.document?.message}</p>}
                    </div>

                    <div className="col-span-12 sm:mb-0 mb-5">
                      <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                        Data de Nascimento
                      </label>
                      <Controller
                        render={({field}) => (
                          <InputMask 
                            mask="99/99/9999"
                            {...field}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          )}
                        // {...register('birthday', {required: true, minLength: 12})}
                        {...register('birthday', {required: true})}
                        name="birthday"
                        control={control}
                        defaultValue=""
                      />
                      {errors.birthday && <p>{errors.birthday?.message}</p>}
                    </div>

                    <div className="col-span-12 sm:mb-0 mb-5">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <Controller
                        render={({field}) => (
                          <InputMask 
                            mask="(99) 99999-9999"
                            {...field}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          )}
                        // {...register('phone', {required: true, minLength: 12})}
                        {...register('phone', {required: true})}
                        name="phone"
                        control={control}
                      />
                      {errors.phone && <p>{errors.phone?.message}</p>}
                    </div>


                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
      </div>
    </MainLayout>
  )
}
