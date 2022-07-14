import Head from "next/head";
import Search from "../components/Search";
import styles from '../styles/Home.module.scss'
// import FamousPlaces from "../components/FamousPlaces";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Next</title>
     
      </Head>

   
        <div className={styles.container}>
          <Search />

          {/* <FamousPlaces /> */}
        </div>
      </div>
  );
}