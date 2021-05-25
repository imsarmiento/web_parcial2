import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SeriesList from "./SeriesList";
import { IntlProvider } from "react-intl";

function App() {
  const urlSpanish =
    "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
  const urlEnglish =
    "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";

  const [data, setData] = useState(null);
  const [text, setText] = useState();

  useEffect(() => {
    const lang = getBrowserLang();
    if (lang.includes("es")) {
      setText(spanishText);
    } else {
      setText(englishText);
    }
    if (!navigator.onLine) {
      let dataStored = localStorage.getItem("englishData");
      if (dataStored === null) {
        setData(null);
      } else {
        if (lang.includes("es")) {
          setData(JSON.parse(localStorage.getItem("spanishData")));
        } else {
          setData(JSON.parse(localStorage.getItem("englishData")));
        }
      }
      return;
    }
    fetchInfo();
  }, []);

  const englishText = {
    id: "#",
    name: "Name",
    channel: "Channel",
    seasons: "Seasons",
    episodes: "Episodes",
    releaseDate: "Release Date",
    imageNotFound: "Image not found",
    loading: "Loading (Check your connection)",
  };

  const spanishText = {
    id: "#",
    name: "Nombre",
    channel: "Canal",
    seasons: "Temporadas",
    episodes: "Episodios",
    releaseDate: "Fecha de estreno",
    imageNotFound: "La imagen no se encuentra disponible",
    loading: "Cargando (Revisa tu conexión)",
  };

  async function fetchInfo() {
    const englishData = await (await fetch(urlEnglish)).json();
    localStorage.setItem("englishData", JSON.stringify(englishData));
    //console.log("en", englishData);
    const spanishData = await (await fetch(urlSpanish)).json();
    localStorage.setItem("spanishData", JSON.stringify(spanishData));
    //console.log("es", JSON.stringify(spanishData));
    const lang = getBrowserLang();
    if (lang.includes("es")) {
      setData(spanishData);
      setText(spanishText);
      console.log("es");
    } else {
      setData(englishData);
      setText(englishText);
      console.log("en");
    }
  }

  function getBrowserLang() {
    return navigator.language || navigator.userLanguage;
  }

  return (
    <IntlProvider locale={getBrowserLang()} messages={text}>
      <Container fluid>
        <h1>T.V. Series</h1>
        <hr />
        {data !== null ? (
          <SeriesList data={[] && data}></SeriesList>
        ) : (
          <p>
            {getBrowserLang().includes("es")
              ? "Cargando (Revisa tu conexión)"
              : "Loading (Check your connection)"}
          </p>
        )}
      </Container>
    </IntlProvider>
  );
}

export default App;
