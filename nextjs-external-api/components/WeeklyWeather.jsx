import React from "react";
import moment from "moment-timezone";
import Image from "next/image";
import styles from "../styles/WeeklyWeather.module.scss";

export default function WeeklyWeather({ weeklyWeather, timezone }) {
  return (
    <div>
      <div className={styles.weekly}>
        {weeklyWeather.length > 0 &&
          weeklyWeather.map((weather, index) => {
            if (index == 0) {
              return;
            }

            return (
              <div className={styles.weekly__card} key={weather.dt}>
                <h3>{moment.unix(weather.dt).tz(timezone).format("dddd")}</h3>

                <div className={styles.weekly__iconWrapper}>
                  <div>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      layout="fill"
                    />
                  </div>
                </div>

                <h5>{weather.weather[0].description}</h5>

                <h5>
                  <span>{weather.temp.max.toFixed(0)}&deg;C / </span>
                  <span>{weather.temp.min.toFixed(0)}&deg;C</span>
                </h5>
              </div>
            );
          })}
      </div>
    </div>
  );
}
