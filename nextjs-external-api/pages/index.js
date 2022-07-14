import Head from "next/head";
import Search from "../components/Search";
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Next</title>
     
      </Head>

   
        <div className={styles.container}>
          <Search />

        </div>
      </div>
  );
}