import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [main, setMain] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [sunset, setSunset] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [isReady, setReady] = useState(false);

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  let date1 = new Date();

  let date = date1.toLocaleString("fr-FR", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  });


  const handleSubmit = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=04f1842ba3c7503c3053331feccdc406&units=metric`)
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
      .catch((err) => console.error(err));
    event.preventDefault();
  }

  React.useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=14.6937&lon=-17.4441&appid=04f1842ba3c7503c3053331feccdc406&units=metric`)
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
      .catch((err) => console.error(err));
  }, []);

  if (isReady) {

    return (
      <div>

        <div>
          <h1>WEATHER APP</h1>
        </div>
        <div>
          Put coordinates
          <form onInput={handleSubmit}>
            Latitude : <input onChange={e => setLatitude(e.target.value)} value={latitude} /><br />
            Longitude : <input onChange={e => setLongitude(e.target.value)} value={longitude} /><br />
          </form>
        </div>
        <p>{date}</p>
        <p>Name : {name}</p>
        <p>Température : {temp} °C</p>
        <p>Description : {desc}</p>
        <p>Main : {main}</p>
        <p>Sunset : {new Date(sunset).toLocaleTimeString()}</p>
        <p>Sunrise : {new Date(sunrise).toLocaleTimeString()}</p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Icône météo"
        />
      </div>
    );
  } else {
    return <div>Chargement en cours...</div>;
  }
}

export default App;
