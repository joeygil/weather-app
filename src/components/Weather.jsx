import React, { useState } from "react";

export const Weather = (props) => {
  let [temp, setTemp] = useState(0);
  let [city, setCity] = useState("");
  let [conditions, setConditions] = useState("");
  let [windSpeed, setWindSpeed] = useState(0);
  let [windDirection, setWindDirection] = useState("");
  let [location, setLocation] = useState("");
  let [country, setCountry] = useState("");
  let [region, setRegion] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  const reset = () => {
    {
      setTemp("");
      setCity("");
      setConditions("");
      setWindSpeed(0);
      setWindDirection("");
      setLocation("");
      setRegion("");
      setLocation("");
      setCountry("");
      setIsLoading(true);
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
          setCountry(response.location.country);
          setRegion(response.location.region);
        })
        .catch((err) => console.error(err));
      setIsLoading(false);
    }
  };

  const renderWeatherIcon = () => {
    if (conditions.includes("Clear") || conditions.includes("Sunny")) {
      return <i className="fa solid fa-sun" />;
    } else if (
      conditions.includes("Overcast") ||
      conditions.includes("cloud")
    ) {
      return <i className="fa-solid fa-cloud" style={{ color: "white" }}></i>;
    } else if (conditions.includes("rain")) {
      return (
        <i className="fa-solid fa-cloud-rain" style={{ color: "white" }}></i>
      );
    } else if (conditions.includes("Mist")) {
      return <i className="fa-solid fa-smog" style={{ color: "white" }}></i>;
    } else if (conditions.includes("Freezing") || conditions.includes("Ice")) {
      return (
        <i className="fa-solid fa-snowflake" style={{ color: "white" }}></i>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <input
          id="search-bar"
          type="text"
          placeholder="Search City Name"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={fetchTemp}
        ></input>
      ) : (
        ""
      )}
      {!isLoading ? (
        <div className="location-display">
          {!isLoading ? `${location.toUpperCase()}` : ""}
          <div className="region">{!isLoading ? `${region}` : ""}</div>
          <div className="country">{!isLoading ? `${country}` : ""}</div>
        </div>
      ) : (
        ""
      )}

      <div className="weather-icons">{renderWeatherIcon()}</div>

      <div className="temp-display">
        {!isLoading ? `${Math.round(temp)}°c` : ""}
      </div>

      {!isLoading ? (
        <div className="weather-details">
          <div className="conditions-details">
            {!isLoading ? conditions : ""}
          </div>
          <hr />
          <div className="wind-info-container">
            <div className="wind-info">
              {!isLoading ? <i className="fa-solid fa-wind"></i> : ""}
              {!isLoading ? `${windSpeed} mph` : ""}
              {!isLoading ? <i className="fa-solid fa-compass"></i> : ""}
              {!isLoading ? windDirection : ""}
            </div>
          </div>
          {!isLoading ? (
            <button className="btn btn-primary" onClick={reset}>
              Reset
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
