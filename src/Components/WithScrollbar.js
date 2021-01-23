import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class WithScrollbar extends React.Component {
  state = { additionalTransfrom: 0 };
  render() {
    const CustomSlider = ({ carouselState }) => {
      let value = 0;
      let carouselItemWidth = 0;
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth;
        const maxTranslateX = Math.round(
          // so that we don't over-slide
          carouselItemWidth *
            (this.Carousel.state.totalItems -
              this.Carousel.state.slidesToShow) +
            150
        );
        value = maxTranslateX / 100; // calculate the unit of transform for the slider
      }
      const { transform } = carouselState;
      return (
        <div className="custom-slider">
          <input
            type="range"
            value={Math.round(Math.abs(transform) / value)}
            defaultValue={0}
            max={
              (carouselItemWidth *
                (carouselState.totalItems - carouselState.slidesToShow) +
                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
              value
            }
            onChange={(e) => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false;
              }
              const nextTransform = e.target.value * value;
              const nextSlide = Math.round(nextTransform / carouselItemWidth);
              if (
                e.target.value === 0 &&
                this.state.additionalTransfrom === 150
              ) {
                this.Carousel.isAnimationAllowed = true;
                this.setState({ additionalTransfrom: 0 });
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide,
              });
            }}
            className="custom-slider__input"
          />
        </div>
      );
    };
    return (
      <Carousel
        swipeable={true}
        ssr={false}
        ref={(el) => (this.Carousel = el)}
        partialVisbile={false}
        customButtonGroup={<CustomSlider />}
        itemClass="slider-image-item"
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-this.state.additionalTransfrom}
        beforeChange={(nextSlide) => {
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
            this.setState({ additionalTransfrom: 150 });
          }
          if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 });
          }
        }}
      >
        <div class="image-container increase-size">
          <div class="image-container-text"></div>
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src={process.env.PUBLIC_URL + "/images/film-reel.png"}
            alt="Film reel"
          />
        </div>
        <div class="increase-size">
          <div class="image-container-text"></div>
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src={process.env.PUBLIC_URL + "/images/bauhaus-load.gif"}
            alt="Bauhaus Gif"
          />
        </div>

        <div class="image-container increase-size">
          <div class="image-container-text"></div>
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src={process.env.PUBLIC_URL + "/images/pandemic-film-club.gif"}
            alt="PFC theater opening"
          />
        </div>
        <div class="image-container increase-size">
          <div class="image-container-text"></div>
            <div style={{"textAlign":"center"}}>                    
            <img
                draggable={false}
                style={{ width: "50%", cursor: "pointer" }}
                src={process.env.PUBLIC_URL + "/images/1MmIEguoGEnnZxaINQsQA0z21Nbq8R.gif"}
                alt="Bauhaus ballet"
            />
          </div>
        </div>

        <div class="image-container increase-size">
          <div class="image-container-text"></div>
          <img
            draggable={false}
            style={{ width: "150%", cursor: "pointer" }}
            src={process.env.PUBLIC_URL + "/images/Screen Shot 2021-01-21 at 5.25.30 PM.png"}
            alt="Greener Grass"
          />
        </div>
        {/* <div class="image-container increase-size">
          <div class="image-container-text"></div>
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src="https://images.unsplash.com/flagged/photo-1556091766-9b818bc73fad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80"
          /> */}
        {/* </div> */}
      </Carousel>
    );
  }
}

export default WithScrollbar;
