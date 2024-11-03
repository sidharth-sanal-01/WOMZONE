import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { dummySlides } from "../../dummyData/dummySlides";
import "./slider.css";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

const MainSlider = () => {
  const [current, setCurrent] = useState(0);
  const [sliderbuttonActivated, setSliderbuttonActivated] = useState(false);
  const length = dummySlides.length;
  var timer = null;
  var delayInMilliseconds = 10000; //1 second

  timer =
    !sliderbuttonActivated &&
    setTimeout(function () {
      setCurrent(current === length - 1 ? 0 : current + 1);
      //your code to be executed after 1 second
    }, delayInMilliseconds);

  const nextSlide = () => {
    setSliderbuttonActivated(true);
    clearTimeout(timer);
    setCurrent(current === length - 1 ? 0 : current + 1);
    // delayInMilliseconds=60000;
  };

  const prevSlide = () => {
    setSliderbuttonActivated(true);
    clearTimeout(timer);

    setCurrent(current === 0 ? length - 1 : current - 1);
    // delayInMilliseconds=60000;
  };

  if (!Array.isArray(dummySlides) || dummySlides.length <= 0) {
    return null;
  }

  return (
    <div className="MainSlider">
      <ArrowLeftIcon className="arrowLeft" onClick={prevSlide} />
      <ArrowRightIcon className="arrowRight" onClick={nextSlide} />
      {dummySlides.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active " : "slide"}
            key={index}
          >
            {index === current && (
              <div className="sliderWrapper">
                <div className="sliderLeft">
                  <div
                    className="sliderImageCircle"
                    style={{ "backgroundColor": "yellow" }}
                  ></div>
                  <div className="sliderImage">
                    <img src={slide.image} />
                  </div>
                </div>
                <div className="sliderRight">
                  <h1 className="sliderHeading">{slide.heading}</h1>
                  <h4 className="slidertext">{slide.text}</h4>
                  <button className="shopNowButton">SHOP NOW</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default MainSlider;
