import axios from 'axios'
import React, { useState, useEffect } from 'react'

const JsonTuonti = ({maanNimi}) => {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
        .get(`http://api.openweathermap.org/data/2.5/find?q=${maanNimi}&units=metric&appid=297c5f808c7286cf1c8dc6413e153464`)
        .then(response => {
            setWeather(response.data.list[0])
        })
    }, [])


        return (
            <div>
                {weather.main && (
                    <div>
                        <h2>Weather in {weather.name} </h2>
                        <h4>temperature: {weather.main.temp}</h4>
                        <p>weather icon: </p>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="saa" width="60px" height="50px"></img>
                        <h3>wind: {weather.wind.speed} m/s in the metereological direction of {weather.wind.deg}</h3>
                    </div>)}
            </div>
        )

}

export default JsonTuonti