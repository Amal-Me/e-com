import { useEffect, useState } from 'react';
import "./Slider.scss";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import { sliderData } from './slider-data';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        // si c'est la derniere img on revient a 0 sinon + 1
        setCurrentSlide(currentSlide === slideLength -1 ? 0 : currentSlide + 1);
    };
    const prevSlide = () => {
        // si premierez img on revient a la derniere - 1
        setCurrentSlide(currentSlide === 0  ? slideLength -1 : currentSlide - 1);
    };

    useEffect(() => {
    setCurrentSlide(0)
    }, []);

    

    useEffect(() => {
        if(autoScroll) {
          const auto = () => {
            slideInterval = setInterval(nextSlide, intervalTime)
          };
          auto();
        }
        return () => clearInterval(slideInterval);
      }, [autoScroll, currentSlide, slideInterval]);
    
  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
      <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>

      {sliderData.map((slide, index) => {
        const {image, heading, desc} = slide
        return(
           <div key={index}className={index === currentSlide ? "slide current"  : "slide"}>
            {index === currentSlide && (
                <>
                <img src={image} alt="slide" />
                <div className="content">
                    <h2>{heading}</h2>
                    <p>{desc}</p>
                    <hr />
                    <a href="#product" className='--btn --btn-primary'>
                        Shop Now
                    </a>
                </div>
                </>
            )}

           </div>
        )
      })}
    </div>
  );
};

export default Slider;
