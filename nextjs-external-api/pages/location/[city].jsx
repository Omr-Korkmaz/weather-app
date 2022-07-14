import React from "react";
import cities from "../../lib/city.list.json";
import Search from "../../components/Search";
import TodaysWeather from "../../components/TodaysWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import Link from "next/link";
import Head from "next/head";
import styles from '../../styles/city.module.scss'
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export async function getServerSideProps(context) {
  const city = getCityId(context.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
  );

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }


  const weeklyWeather = data.daily;

  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      weeklyWeather: weeklyWeather,
    }, // will be passed to the page component as props
  };
}

const getCityId = (param) => {
  const cityParam = param.trim();
  // get the id of the city
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};



export default function City({
  city,
  weeklyWeather,
  timezone,
}) {
  return (
    <>
      <Head>
        <title>{city.name} Weather - Next Weather App</title>
      </Head>

      <div className={styles.city__pageWrapper}>
        <div className={styles.city__container}>
            <div className={styles.city__container__search}>
          <Link href="/">
            <a >
            <ArrowBackIcon className={styles.city__container__icon} />
            <HomeIcon className={styles.city__container__icon}  /> 
         
            </a>
          </Link>
          <Search />
          </div>
         
          <TodaysWeather
            city={city}
            weather={weeklyWeather[0]}
            timezone={timezone}
          />
          <WeeklyWeather weeklyWeather={weeklyWeather} timezone={timezone} />
     
        </div>
      </div>
    </>
  );
}