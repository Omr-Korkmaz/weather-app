import { useState } from "react";
import "./App.css";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("istanbul");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=efb5ae582b507a97fa09ed7beb6b0aa8`;

  const searchLocation = async () => {
    try {
      const result = await axios.get(url);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchLocation();
    setLocation("");
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          placeholder="Enter Location"
          type="text"
        />
      </form>

      <CurrentWeather data={data} />
    </div>
  );
}
export default App;
