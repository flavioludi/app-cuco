import MainLayout from '../../components/layout/MainLayout';

export default function ClientForm() {
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('teste')
    console.log({e})
    const resp = await fetch('http://api.cuco.local/api/client', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "name": "Client 1",
        "document": "08207199602",
        "birthday": "1986-01-12",
        "phone": "31992014442"
      }),
    })
  }
  return (
    <MainLayout>
      <div className="mt-10 sm:mt-0">  
          <div className="mt-5 md:mt-0 ">
            <form onSubmit={onSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-12">
                      <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                        CPF
                      </label>
                      <input
                        type="text"
                        name="document"
                        id="document"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-12">
                      <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                        Data de Nascimento
                      </label>
                      <input
                        type="text"
                        name="birthday"
                        id="birthday"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-12">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
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
