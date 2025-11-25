import React from "react";

const Carousel = () => {
  const images = [
    {
      url: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1763023975702_bmsddpd2webbanner.jpg",
      caption: "First Slide Caption",
    },
    {
      url: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1763124064863_ssweb.jpeg",
      caption: "Second Slide Caption",
    },
    {
      url: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1760430005960_popccweb.jpg",
      caption: "Third Slide Caption",
    },
  ];

  return (
    <div className="container mt-4">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : ""}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={img.url}
                className="d-block w-100 rounded"
                alt="slide" height="300"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{img.caption}</h5>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
