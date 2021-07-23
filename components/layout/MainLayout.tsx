import Head from 'next/head'
import MainHeader from './MainHeader'

const MainLayout: React.FC<Props> = ({
  children
}) => {
  return (
    <div className="global-container">
      <Head>
        <title>Cuco App</title>
        <meta name="description" content="Cuco app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainHeader />

      <main className="global-main">
        {children}
      </main>

      <footer>
        <a
          href="//khosmos.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Khosmos
        </a>
      </footer>
    </div>
  )
}

export default MainLayout;
