import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import MainHeader from './MainHeader'

const MainLayout: React.FC<Props> = ({
  children
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cuco App</title>
        <meta name="description" content="Cuco app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainHeader />

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
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
