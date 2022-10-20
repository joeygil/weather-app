import React, { useState } from "react";

export const Weather = (props) => {
  let [temp, setTemp] = useState(0);
  let [city, setCity] = useState("");
  let [conditions, setConditions] = useState("");
  let [windSpeed, setWindSpeed] = useState(0);
  let [windDirection, setWindDirection] = useState("");
  let [location, setLocation] = useState("");

  const reset = () => {
    {
      setTemp(0);
      setCity("");
      setConditions("");
      setWindSpeed(0);
      setWindDirection("");
      setLocation("");
    }
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f09fb938bdmsh5ec6ac48eb26dc2p11646ajsn44015fdaf832",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const fetchTemp = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setTemp(response.current.temp_c);
          setConditions(response.current.condition.text);
          setWindSpeed(response.current.wind_mph);
          setWindDirection(response.current.wind_dir);
          setLocation(response.location.name);
        })
        .catch((err) => console.error(err));
    }
  };

  const renderWeatherIcon = () => {
    switch (conditions) {
      case conditions.includes("Sun"):
        return <i class="fa-solid fa-sun"></i>;
        break;
      case conditions.includes("cloud"):
        return <i class="fa-solid fa-cloud" style={{ color: "white" }}></i>;
        break;
      case conditions.includes("Clear"):
        return <i class="fa-solid fa-sun" style={{ color: "white" }}></i>;
        break;
      default:
        return;
    }
  };

  return (
    <>
      <input
        id="search-bar"
        type="text"
        placeholder="Search City Name"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={fetchTemp}
      ></input>
      <div className="location-display">{city.length > 3 ? location : ""}</div>
      <div className="weather-icons">
        {/* {renderWeatherIcon()} */}
        {conditions.includes("Sunny") ? (
          <i class="fa-solid fa-sun"></i>
        ) : "" || conditions.includes("cloud") ? (
          <i class="fa-solid fa-cloud" style={{ color: "white" }}></i>
        ) : (
          ""
        )}
      </div>
      <div className="temp-display">{windSpeed > 1 ? `${temp}°` : ""}</div>

      <div className="weather-details">
        <div>{city.length > 3 ? conditions : ""}</div>
        <div>
          <i className="fa-solid fa-wind"></i>{" "}
          {city.length > 3 ? `${windSpeed} mph` : ""}
        </div>
        <div>
          <i className="fa-solid fa-compass"></i>
          {city ? windDirection : ""}
        </div>

        <button className="btn btn-primary" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};
