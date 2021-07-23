import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import MainLayout from '../../components/layout/MainLayout';
import Table from '../../components/table/Table';

const DefaultTd = ({data}) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data}</td>
)

export default function Home({
  clients
}) {
  const router = useRouter();
  const columns = ['Nome', 'CPF', 'Data de Nascimento', 'Telefone', 'Ações']
  const data = clients.map(client => (
    [
      {
        attribute: 'name',
        value: 
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex items-center">
              {client.image && (
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full" src={client.image} alt={`img-client-${client.document}`} />
                </div>
              )}
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
              </div>
            </div>
          </td>
      },
      {
        attribute: 'document',
        value: <DefaultTd data={client.document} />,
      },
      {
        attribute: 'birthday',
        value: <DefaultTd data={client.birthday} />,
      },
      {
        attribute: 'phone',
        value: <DefaultTd data={client.phone} />,
      },
      {
        attribute: 'actions',
        value: <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Excluir
                </a>
              </td>
      },
    ]
  ));
  return (
    <MainLayout>
      <button
        onClick={() => router.push('/client/create')}
        className="md:mb-2 inline-flex justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Adicionar novo
      </button>
      <Table columns={columns} data={data} />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${process.env.api_base_url}/client`)
  const { data } = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { 
      clients: data,
    },
  }
}
