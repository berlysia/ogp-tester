import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useCallback, useReducer, useState } from "react";
import styles from "../styles/Home.module.css";

function KV({name = "", value = ""}: { name?: string, value?:string}) {
  const [myName, setMyName] = useState(name);
  const [myValue, setMyValue] = useState(value);
  const handleNameChange = useCallback((e) => setMyName(e.currentTarget.value), []);
  const handleValueChange = useCallback(
    (e) => setMyValue(e.currentTarget.value),
    []
  );
  return (
    <div>
      <label>
        <input onChange={handleNameChange} value={myName}></input>:
        <input
          onChange={handleValueChange}
          name={myName}
          value={String(myValue)}
        />
      </label>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    },
  };
};

const Home: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [addedFields, addField] = useReducer(x => ++x, 0);
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
        <form method="get" action="./">
          {Object.entries(props.query).map(([name, value]) => (
            <KV key={name} name={name} value={String(value)} />
          ))}
          <div>
            <button type="button" onClick={addField}>
              add field
            </button>
          </div>
          {Array.from({ length: addedFields }, (x, i) => <KV key={i} />)}
          <button type="submit">submit</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
