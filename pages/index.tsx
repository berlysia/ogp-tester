import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



export const getServerSideProps: GetServerSideProps =  async (context) => {
  return {
    props: {
      query: context.query,
    },
  };
}

const Home: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        {Object.entries(props.query).map(([key, value]) => (
          <meta key={key} property={key} content={String(value)} />
        ))}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>OGPみるやつ</h1>
        <table>
          <tbody>
            {Object.entries(props.query).map(([key, value]) => (
              <tr key={key}>
                <th>{key}</th>
                <td>{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home
