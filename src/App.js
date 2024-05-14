import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [main, setMain] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [sunset, setSunset] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [isReady, setReady] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState("");

  const fetchData = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=04f1842ba3c7503c3053331feccdc406&units=metric`)
      .then((result) => result.json())
      .then((jsonresult) => {
        setName(jsonresult.name);
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].description);
        setMain(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setSunset(jsonresult.sys.sunset);
        setSunrise(jsonresult.sys.sunrise);
        setReady(true);
      })
      .catch((err) => {
        setError("Erreur de chargement des données météorologiques.");
        console.error(err);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!latitude || !longitude) {
      setError("Veuillez entrer des coordonnées valides.");
      return;
    }
    setError("");
    fetchData(latitude, longitude);
  }

  useEffect(() => {
    fetchData(14.6937, -17.4441);
  }, []);

  return (
    <div className="container mt-3">
      <style>
        {`
          .card-title {
            background-color: pink;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
          }
          .btn-primary {
            float: right;
          }
          .weather-info {
            text-align: center;
            background-color: pink;
            padding: 20px;
            border-radius: 5px;
          }
          .weather-info p {
            margin: 5px 0;
          }
        `}
      </style>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">WEATHER APP</h1>
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="form-group">
              <label>Latitude :</label>
              <input
                type="text"
                className="form-control"
                onChange={e => setLatitude(e.target.value)}
                value={latitude}
              />
            </div>
            <div className="form-group">
              <label>Longitude :</label>
              <input
                type="text"
                className="form-control"
                onChange={e => setLongitude(e.target.value)}
                value={longitude}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
          {isReady ? (
            <div className="weather-info">
              <p>{new Date().toLocaleString("fr-FR", { weekday: "short", hour: "numeric", minute: "numeric" })}</p>
              <p>Nom : {name}</p>
              <p>Température : {temp} °C</p>
              <p>Description : {desc}</p>
              <p>Principal : {main}</p>
              <p>Coucher du soleil : {new Date(sunset * 1000).toLocaleTimeString()}</p>
              <p>Lever du soleil : {new Date(sunrise * 1000).toLocaleTimeString()}</p>
              <div className="weather-icon">
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt="Icône météo"
                />
              </div>
            </div>
          ) : (
            <div className="container mt-5">Chargement en cours...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
