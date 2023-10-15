import React, { useState } from 'react'

import rainy from './assets/rainy.mp4'
import sunny from './assets/sunny.mp4'
import clouds from './assets/clouds.mp4';

import axios from 'axios'

const getUrl = (currentLocation) => `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

const weatherBg = {
  Clouds: clouds,
  rainy: rainy,
  Clear: sunny
}

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [currentWeatherBg, setCurrentWeatherBg] = useState('');

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(getUrl(location)).then((response) => {
        setData(response.data)
        setCurrentWeatherBg(weatherBg[response.data.weather[0].main])
      })
      setLocation('')
    }
  }

  return (
    <div className='app'>
      <div className="video-container">
        <video autoPlay muted loop className="background-video"  key={currentWeatherBg}>
           <source src={currentWeatherBg} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Check weather of location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
              <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
             {data.weather ? <span>{data.weather[0].main}</span> : null}
          </div>
        </div>
          {data.wind && data.main && <div>
              <div>Wind: {data.wind ? <span className="bold">{data.wind.speed.toFixed()} MPH</span> : null}</div>
              <div>Humidity: {data.main ? <span className="bold">{data.main.humidity}%</span> : null}</div>
              <div>Feels like: {data.main ?
                  <span className="bold">{data.main.feels_like.toFixed()}°C</span> : null}</div>
          </div>}
      </div>
      </div>
    </div>
  );
}

export default App;
