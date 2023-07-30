import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../components/Wetherapp.css";
import { BsSearch } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { BiCurrentLocation } from "react-icons/bi";
import { PiWindBold } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { LiaAtomSolid } from "react-icons/lia";
import { GiInvisible } from "react-icons/gi";
import axios from "axios";

const Weatherapp = () => {
  const [search, setsearch] = useState("");
  const [data, setdata] = useState({});
  const [loader, setloader] = useState(false);
  const mykey = "610debe9976dbf64bebb7540732f90b0";
  const iconcode = data?.weather?.[0].icon;
  const icons = `http://openweathermap.org/img/w/${iconcode}.png`;
  const name = data?.name;
  const discription = data?.weather?.[0].description;
  const temp = (data?.main?.temp - 273.15).toFixed(0);
  const humedity = data?.main?.humidity;
  const presure = data?.main?.pressure;
  const visiblity = data?.visibility / 1000;
  const wind = data?.wind?.speed;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const date = d.getDate();
  const m = months[d.getMonth()];
  const day = days[d.getDay()];

  const fachapidata = async (cityname) => {
    if (!cityname) return;
    setloader(true);

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${mykey}`
      )
      .then(async (repo) => {
        setdata(repo.data);
        setloader(false);
      })
      .catch((err) => {
        console.log("err", err);
        setloader(false);
      });
  };

  const hendaldata = () => {
    fachapidata(search);
  };
  const handelinput = (e) => {
    setsearch(e.target.value);
  };

  useEffect(() => {
    setloader(true);
    fachapidata("haryana");
    setloader(false);
  }, []);

  const setcurrentlocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${mykey}`;
      setloader(true);

      await axios
        .get(url)
        .then(async (resp) => {
          setdata(resp.data);
          setloader(false);
        })
        .catch((err) => {
          console.log("err", err);
          setloader(false);
        });
    });
  };

  return (
    <>
      {loader ? (
        <div>
          <h1 className="loader">loading........</h1>
        </div>
      ) : (
        <>
          <Container className="topbar-main">
            <Row className="py-3 ">
              <Col className="d-flex  justify-content-center">
                <button onClick={setcurrentlocation}>
                  <BiCurrentLocation />
                </button>
                <input
                  type="text"
                  id="cityset"
                  value={search}
                  onChange={handelinput}
                />
                <button onClick={hendaldata}>
                  <BsSearch />
                </button>
              </Col>
            </Row>
          </Container>
          <Row className=" mt-4 px-4 first-row d-flex">
            <Col
              xs={4}
              md={4}
              className="mt-1 firstbox rounded position-relative   text-center"
            >
              <h3>
                <span>
                  <ImLocation />
                </span>
                {name}
              </h3>
              <h1>
                {temp}
                <span>&#176;c</span>
              </h1>
            </Col>
            <Col
              xs={4}
              md={4}
              className=" mt-1 centerbox  rounded position-relative text-center "
            >
              <img src={icons} alt="hello" />
              <h4>{discription}</h4>
            </Col>
            <Col
              xs={4}
              md={4}
              className=" mt-1  lastbox rounded position-relative text-center flex-row "
            >
              <h1>{day}</h1>
              <h4>{date}</h4>
              <h4>{m}</h4>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between alldataicon">
            <Col xs={5} md={5} className=" text-center">
              <PiWindBold className="icnn" />
              <h4>{wind} km/h</h4>
              <h6>wind</h6>
            </Col>
            <Col xs={5} md={5} className=" text-center">
              <WiHumidity className="icnn" />
              <h4>{humedity} %</h4>
              <h6>humedity</h6>
            </Col>
            <Col xs={5} md={5} className=" text-center">
              <LiaAtomSolid className="icnn" />
              <h4>{presure} hPa</h4>
              <h6>pressure</h6>
            </Col>
            <Col xs={5} md={5} className=" text-center">
              <GiInvisible className="icnn" />
              <h4>{visiblity} km</h4>
              <h6>visibility</h6>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Weatherapp;
