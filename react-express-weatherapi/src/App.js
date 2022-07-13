import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios'
import Search from "./components/Search";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
console.log(url);


const searchLocation = async () => {
  try {
    const response = await axios.get(url);
     setData(response.data);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

// useEffect(()=>{
//   searchLocation();
// },[searchLocation])




//   //api documentation: https://dictionaryapi.dev/


const handleSubmit = (event) => {
  event.preventDefault();
  searchLocation();
  setLocation('');
};

const changeWord = (event) => {
  setLocation(event.target.value);
};

  return (
    <div className="main-container">
      <div className="search">
        <form onSubmit={handleSubmit}>
        <input className="search"
          value={location}
          onChange={changeWord}
          placeholder='Enter Location'
          type="text" />
          </form>
        
      </div>
      <div className="city">
        <div className="top">
          <div className="location">
            <p className="city-name">{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>

            <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
                        <p>{data.weather[0].description}</p>
                    </div>
          </div>
        }
              </div>
    </div>
  );
}


export default App;
