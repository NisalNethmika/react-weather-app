import React, { useEffect, useRef } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/drizzle.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import cloud_icon from '../assets/cloud.png'

function Weather() {

  const [weatherData, setWeatherData] = React.useState(false)
  const inputRef = useRef()

  const sendRequest = async (city_name) => {
    if (city_name.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${city_name}&aqi=no`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      console.log(data);
      setWeatherData({
        location: data.location.name,
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_kph,
        condition: data.current.condition.text,
        icon: data.current.condition.icon
      });
    }
    catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. " + error.message);
      setWeatherData(false);
      return;
    }
  }

  useEffect(() => {
    const city_name = "Colombo"; // Default city
    sendRequest(city_name);
  },[])

  return (
  <div className='mainContainer place-self-center p-5 rounded-lg w-[600px] shadow-lg bg-gradient-to-br from-blue-300 to-blue-500'>
    <div className="search flex justify-between items-center mb-6 bg-white rounded-lg overflow-hidden shadow-md gap-10">
        <input
          ref={inputRef} 
          type="text" 
          placeholder='Search city...' 
          className="p-3 w-full focus:outline-none text-gray-700 placeholder-gray-400 border-none" 
        />
        <div className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors duration-300 p-3">
          <img 
            onClick={() => {
              const city_name = inputRef.current.value;
              sendRequest(city_name);
            }}
            src={search_icon} 
            className='w-6 h-6 filter brightness-0 invert' 
            alt="Search" 
          />
        </div>
      </div>
      
      {weatherData?<>
        <div className="weather-image flex justify-center my-4">
        <img src={weatherData.icon} alt="Weather Icon" className="w-32 h-32" />
      </div>

      <div className="temperature text-center my-4">
        <h1 className="text-6xl font-bold text-gray-800">{weatherData.temperature}°C</h1>
      </div>

      <div className="location text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">{weatherData.location}</h2>
      </div>

      <div className="data-container flex justify-between mt-6">
        <div className="element flex items-center bg-gray-200 p-3 rounded-lg w-[45%]">
          <img src={humidity_icon} alt="Humidity Icon" className="w-8 h-8 mr-2" />
          <div className="data">
            <p className="text-xl font-semibold text-gray-800">{weatherData.humidity}%</p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
        </div>
        
        <div className="element flex items-center bg-gray-200 p-3 rounded-lg w-[45%]">
          <img src={wind_icon} alt="Wind Icon" className="w-8 h-8 mr-2" />
          <div className="data">
            <p className="text-xl font-semibold text-gray-800">{weatherData.wind_speed} km/h</p>
            <p className="text-sm text-gray-600">Wind Speed</p>
          </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
